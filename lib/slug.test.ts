import { describe, expect, it } from "vitest";
import { slugify } from "./slug";

describe("slugify", () => {
  it("lowercases and joins words with hyphens", () => {
    expect(slugify("Glide Runner")).toBe("glide-runner");
  });

  it("removes accents", () => {
    expect(slugify('Air Max "Café"')).toBe("air-max-cafe");
    expect(slugify("Kōda Canal Low")).toBe("koda-canal-low");
  });

  it("turns & into 'and'", () => {
    expect(slugify("Pacer & Co")).toBe("pacer-and-co");
  });

  it("collapses separators and trims hyphens", () => {
    expect(slugify("  Black/White -- Gum  ")).toBe("black-white-gum");
  });

  it("returns an empty string when nothing is left", () => {
    expect(slugify("!!!")).toBe("");
  });
});