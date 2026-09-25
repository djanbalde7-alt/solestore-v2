import Link from "next/link";
import { Container } from "../components/ui/Container";
import { ButtonLink } from "../components/ui/Button";
import { ProductGrid } from "../components/product/ProductGrid";
import { getCategories, getFeaturedProducts } from "../lib/queries";
import { formatCount } from "../lib/format";

export const revalidate = 3600;

export default async function Home() {
  const [categories, featured] = await Promise.all([
    getCategories(),
    getFeaturedProducts(8),
  ]);

  return (
    <>
      <section className="border-b border-line bg-subtle">
        <Container className="flex flex-col items-start gap-6 py-20 sm:py-28">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            New season
          </p>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
            Sneakers for every surface.
          </h1>
          <p className="max-w-xl text-lg text-muted">
            Road, court, street, park and trail — five categories, picked for
            how you actually move.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/products" size="lg">
              Shop all sneakers
            </ButtonLink>
            <ButtonLink href="#categories" variant="secondary" size="lg">
              Browse categories
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section id="categories" className="py-16">
        <Container className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            Shop by category
          </h2>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/category/${category.slug}`}
                  className="group flex h-full flex-col justify-between gap-6 rounded-2xl border border-line p-5 transition-colors hover:border-ink"
                >
                  <span className="text-lg font-semibold">{category.name}</span>
                  <span className="text-sm text-muted group-hover:text-ink">
                    {formatCount(category._count.products, "pair")}{" "}
                    <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="pb-20">
        <Container className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              New arrivals
            </h2>
            <Link href="/products" className="text-sm text-muted hover:text-ink">
              View all
            </Link>
          </div>
          <ProductGrid products={featured} />
        </Container>
      </section>
    </>
  );
}