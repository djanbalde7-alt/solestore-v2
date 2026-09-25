import { formatPrice } from "../../lib/format";
import { cn } from "../../lib/cn";

type Props = {
  cents: number;
  className?: string;
};

export function Price({ cents, className }: Props) {
  return (
    <span className={cn("font-medium tabular-nums", className)}>
      {formatPrice(cents)}
    </span>
  );
}