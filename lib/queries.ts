import { cache } from "react";
import { prisma } from "./prisma";
import { inStockFirst } from "./product-order";
import type { ProductCardData } from "./types";

const productCardSelect = {
  id: true,
  name: true,
  slug: true,
  brand: true,
  price: true,
  stock: true,
  images: true,
} as const;

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      slug: true,
      _count: { select: { products: { where: { active: true } } } },
    },
  });
}

export async function getCategorySlugs(): Promise<string[]> {
  const categories = await prisma.category.findMany({
    select: { slug: true },
  });
  return categories.map((category) => category.slug);
}

export const getCategoryBySlug = cache(async (slug: string) => {
  return prisma.category.findUnique({
    where: { slug },
    select: { id: true, name: true, slug: true },
  });
});

export async function getFeaturedProducts(
  limit = 8
): Promise<ProductCardData[]> {
  return prisma.product.findMany({
    where: { active: true, stock: { gt: 0 } },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: limit,
    select: productCardSelect,
  });
}

export async function getAllProducts(): Promise<ProductCardData[]> {
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    select: productCardSelect,
  });
  return inStockFirst(products);
}

export async function getProductsByCategory(
  categoryId: number
): Promise<ProductCardData[]> {
  const products = await prisma.product.findMany({
    where: { active: true, categoryId },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    select: productCardSelect,
  });
  return inStockFirst(products);
}