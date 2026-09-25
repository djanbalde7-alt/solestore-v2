import { describe, expect, it } from "vitest";
import { inStockFirst } from "./product-order";

const items = [
  { id: 1, stock: 0 },
  { id: 2, stock: 12 },
  { id: 3, stock: 0 },
  { id: 4, stock: 5 },
];

describe("inStockFirst", () => {
  it("moves out-of-stock items to the end", () => {
    expect(inStockFirst(items).map((i) => i.id)).toEqual([2, 4, 1, 3]);
  });

  it("keeps the original order within each group", () => {
    const result = inStockFirst(items);
    expect(result.filter((i) => i.stock > 0).map((i) => i.id)).toEqual([2, 4]);
    expect(result.filter((i) => i.stock === 0).map((i) => i.id)).toEqual([1, 3]);
  });

  it("does not modify the original array", () => {
    const copy = [...items];
    inStockFirst(items);
    expect(items).toEqual(copy);
  });
});