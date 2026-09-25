import { prisma } from "../lib/prisma";
import { Container } from "../components/ui/Container";
import { ButtonLink } from "../components/ui/Button";

export default async function Home() {
  const [products, categories] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
  ]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight">SoleStore-Sneakers</h1>
      <p className="text-muted">
        {products} products · {categories} categories
      </p>
      <ButtonLink href="/design" variant="secondary">
        View design system
      </ButtonLink>
    </Container>
  );
}