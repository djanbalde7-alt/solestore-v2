import { prisma } from "../lib/prisma";

export default async function Home() {
  const [products, categories] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
  ]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">SoleStore-Sneakers</h1>
      <p className="text-neutral-500">
        {products} products · {categories} categories
      </p>
    </main>
  );
}