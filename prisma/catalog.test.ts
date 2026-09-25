import { describe, expect, it } from "vitest";
import { CATEGORIES, buildCatalog } from "./catalog";

const catalog = buildCatalog();

describe("buildCatalog", () => {
  it("builds 50 products", () => {
    expect(catalog).toHaveLength(50);
  });

  it("gives every product a unique slug", () => {
    const slugs = new Set(catalog.map((p) => p.slug));
    expect(slugs.size).toBe(catalog.length);
  });

  it("puts 10 products in each category", () => {
    for (const category of CATEGORIES) {
      const count = catalog.filter((p) => p.categorySlug === category.slug).length;
      expect(count).toBe(10);
    }
  });

  it("uses positive integer prices in cents", () => {
    for (const product of catalog) {
      expect(Number.isInteger(product.price)).toBe(true);
      expect(product.price).toBeGreaterThan(0);
    }
  });

  it("leaves exactly 5 products out of stock", () => {
    expect(catalog.filter((p) => p.stock === 0)).toHaveLength(5);
  });

  it("is identical every time it runs", () => {
    expect(buildCatalog()).toEqual(catalog);
  });
});