import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/Badge";
import { Price } from "../ui/Price";
import type { ProductCardData } from "../../lib/types";

const LOW_STOCK_THRESHOLD = 5;

export function ProductCard({ product }: { product: ProductCardData }) {
  const soldOut = product.stock === 0;
  const lowStock = !soldOut && product.stock <= LOW_STOCK_THRESHOLD;
  const image = product.images[0];

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-subtle">
        {image && (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        )}

        {soldOut && (
          <div className="absolute left-3 top-3">
            <Badge tone="danger">Out of stock</Badge>
          </div>
        )}

        {lowStock && (
          <div className="absolute left-3 top-3">
            <Badge tone="accent">Only {product.stock} left</Badge>
          </div>
        )}
      </div>

      <div className="mt-3 space-y-1">
        <p className="text-xs font-medium uppercase tracking-wider text-muted">
          {product.brand}
        </p>
        <h3 className="line-clamp-1 text-sm font-medium group-hover:underline">
          {product.name}
        </h3>
        <Price cents={product.price} className="text-sm" />
      </div>
    </Link>
  );
}