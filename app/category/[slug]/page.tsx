import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "../../../components/ui/Container";
import { Breadcrumb } from "../../../components/ui/Breadcrumb";
import { EmptyState } from "../../../components/ui/EmptyState";
import { ProductGrid } from "../../../components/product/ProductGrid";
import {
  getCategoryBySlug,
  getCategorySlugs,
  getProductsByCategory,
} from "../../../lib/queries";
import { formatCount } from "../../../lib/format";

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: "Category not found" };
  }

  return {
    title: `${category.name} sneakers`,
    description: `Shop ${category.name.toLowerCase()} sneakers at SoleStore.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(category.id);

  return (
    <Container className="space-y-8 py-10">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/products" },
          { label: category.name },
        ]}
      />

      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{category.name}</h1>
        <p className="text-sm text-muted">{formatCount(products.length, "pair")}</p>
      </header>

      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <EmptyState
          title={`No ${category.name.toLowerCase()} sneakers yet`}
          message="This category is empty for now. Browse the rest of the store in the meantime."
          action={{ href: "/products", label: "Shop all sneakers" }}
        />
      )}
    </Container>
  );
}