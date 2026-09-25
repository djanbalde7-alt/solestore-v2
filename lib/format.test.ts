import { describe, expect, it } from "vitest";
import { formatCount, formatPrice } from "./format";

describe("formatPrice", () => {
  it("formats cents as US dollars", () => {
    expect(formatPrice(12999)).toBe("$129.99");
  });

  it("keeps two decimals", () => {
    expect(formatPrice(5)).toBe("$0.05");
    expect(formatPrice(0)).toBe("$0.00");
  });

  it("adds thousands separators", () => {
    expect(formatPrice(125000)).toBe("$1,250.00");
  });

  it("rejects a non-integer amount", () => {
    expect(() => formatPrice(12.5)).toThrow();
  });
});

describe("formatCount", () => {
  it("uses the singular for exactly one", () => {
    expect(formatCount(1, "pair")).toBe("1 pair");
  });

  it("uses the plural otherwise", () => {
    expect(formatCount(0, "pair")).toBe("0 pairs");
    expect(formatCount(10, "pair")).toBe("10 pairs");
  });

  it("accepts an irregular plural", () => {
    expect(formatCount(2, "category", "categories")).toBe("2 categories");
  });
});