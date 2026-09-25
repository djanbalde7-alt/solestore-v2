import { slugify } from "../lib/slug";

type ModelSeed = {
  brand: string;
  model: string;
  basePrice: number;
};

type CategoryDef = {
  name: string;
  slug: string;
  models: ModelSeed[];
  features: string[];
};

export type ProductSeed = {
  name: string;
  slug: string;
  brand: string;
  colorway: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  categorySlug: string;
};

export const CATEGORIES: CategoryDef[] = [
  {
    name: "Running",
    slug: "running",
    models: [
      { brand: "Northline", model: "Tempo 3", basePrice: 13999 },
      { brand: "Stride Lab", model: "Glide Runner", basePrice: 11999 },
    ],
    features: [
      "Responsive foam cushioning built for daily miles",
      "Breathable engineered mesh for long runs",
    ],
  },
  {
    name: "Basketball",
    slug: "basketball",
    models: [
      { brand: "Ridgeway", model: "Court Rise", basePrice: 15999 },
      { brand: "Pacer & Co", model: "Hangtime Pro", basePrice: 14999 },
    ],
    features: [
      "High-top collar with ankle support for quick cuts",
      "Herringbone traction for hard-court grip",
    ],
  },
  {
    name: "Lifestyle",
    slug: "lifestyle",
    models: [
      { brand: "Kōda", model: "Canal Low", basePrice: 10999 },
      { brand: "Northline", model: "Heritage 84", basePrice: 9999 },
    ],
    features: [
      "Clean leather upper for everyday wear",
      "Padded collar and a cupsole built to last",
    ],
  },
  {
    name: "Skate",
    slug: "skate",
    models: [
      { brand: "Pacer & Co", model: "Ledge Vulc", basePrice: 7999 },
      { brand: "Kōda", model: "Rail Mid", basePrice: 8999 },
    ],
    features: [
      "Vulcanized sole for board feel",
      "Suede toe cap that stands up to grip tape",
    ],
  },
  {
    name: "Trail",
    slug: "trail",
    models: [
      { brand: "Ridgeway", model: "Summit TR", basePrice: 14999 },
      { brand: "Stride Lab", model: "Ridge Grip", basePrice: 12999 },
    ],
    features: [
      "Lugged outsole for loose and rocky terrain",
      "Water-resistant upper for wet trails",
    ],
  },
];

export const COLORWAYS = [
  "Black/White",
  "Bone/Gum",
  "Navy/Red",
  "Olive/Sail",
  "Grey/Volt",
];

export function buildCatalog(): ProductSeed[] {
  const products: ProductSeed[] = [];
  let index = 0;

  for (const category of CATEGORIES) {
    for (const { brand, model, basePrice } of category.models) {
      COLORWAYS.forEach((colorway, c) => {
        const slug = slugify(`${brand} ${model} ${colorway}`);
        const feature = category.features[c % category.features.length];

        products.push({
          name: `${model} "${colorway}"`,
          slug,
          brand,
          colorway,
          description: `${brand} ${model} in ${colorway}. ${feature}.`,
          price: basePrice + (c % 2 === 0 ? 0 : 1000),
          stock: index % 10 === 3 ? 0 : 5 + ((index * 7) % 36),
          images: [1, 2, 3].map(
            (n) => `https://picsum.photos/seed/${slug}-${n}/800/800`
          ),
          categorySlug: category.slug,
        });

        index++;
      });
    }
  }

  return products;
}