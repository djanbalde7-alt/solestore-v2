import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "../../components/ui/Container";
import { Breadcrumb } from "../../components/ui/Breadcrumb";
import { EmptyState } from "../../components/ui/EmptyState";
import { ProductGrid } from "../../components/product/ProductGrid";
import { getAllProducts, getCategories } from "../../lib/queries";
import { formatCount } from "../../lib/format";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Shop all sneakers",
  description:
    "Every pair in the store — running, basketball, lifestyle, skate and trail.",
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategories(),
  ]);

  return (
    <Container className="space-y-8 py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Shop" }]} />

      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">All sneakers</h1>
        <p className="text-sm text-muted">{formatCount(products.length, "pair")}</p>
      </header>

      <nav aria-label="Categories">
        <ul className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/category/${category.slug}`}
                className="inline-flex h-11 items-center rounded-full border border-line px-4 text-sm transition-colors hover:border-ink"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <EmptyState
          title="The store is empty"
          message="No sneakers are listed right now. Check back soon."
          action={{ href: "/", label: "Back to home" }}
        />
      )}
    </Container>
  );
}