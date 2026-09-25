import "dotenv/config";
import { prisma } from "../lib/prisma";
import { CATEGORIES, buildCatalog } from "./catalog";

async function clearTables(): Promise<void> {
  await prisma.productView.deleteMany();
  await prisma.searchLog.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
}

async function main(): Promise<void> {
  console.log("Seed — clearing tables");
  await clearTables();

  console.log("Seed — creating categories");
  const categoryIds = new Map<string, number>();

  for (const category of CATEGORIES) {
    const created = await prisma.category.create({
      data: { name: category.name, slug: category.slug },
    });
    categoryIds.set(category.slug, created.id);
  }

  console.log("Seed — creating products");
  const catalog = buildCatalog();

  await prisma.product.createMany({
    data: catalog.map(({ categorySlug, ...product }) => {
      const categoryId = categoryIds.get(categorySlug);
      if (categoryId === undefined) {
        throw new Error(`Unknown category: ${categorySlug}`);
      }
      return { ...product, categoryId };
    }),
  });

  const [categories, products, outOfStock] = await Promise.all([
    prisma.category.count(),
    prisma.product.count(),
    prisma.product.count({ where: { stock: 0 } }),
  ]);

  console.log(
    `Seed — done: ${categories} categories, ${products} products, ${outOfStock} out of stock`
  );
}

main()
  .catch((error) => {
    console.error("Seed — failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });