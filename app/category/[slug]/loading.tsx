import { Container } from "../../../components/ui/Container";
import { ProductGridSkeleton } from "../../../components/product/ProductGridSkeleton";

export default function Loading() {
  return (
    <Container className="space-y-8 py-10">
      <p role="status" className="sr-only">
        Loading category…
      </p>
      <div className="h-9 w-40 animate-pulse rounded bg-subtle" />
      <ProductGridSkeleton />
    </Container>
  );
}