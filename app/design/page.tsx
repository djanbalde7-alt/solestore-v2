import type { Metadata } from "next";
import { Container } from "../../components/ui/Container";
import { Button, ButtonLink } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Price } from "../../components/ui/Price";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false },
};

const COLORS = [
  { name: "ink", swatch: "bg-ink" },
  { name: "muted", swatch: "bg-muted" },
  { name: "faint", swatch: "bg-faint" },
  { name: "line", swatch: "bg-line" },
  { name: "subtle", swatch: "bg-subtle" },
  { name: "accent", swatch: "bg-accent" },
  { name: "accent-strong", swatch: "bg-accent-strong" },
  { name: "accent-soft", swatch: "bg-accent-soft" },
  { name: "success", swatch: "bg-success" },
  { name: "danger", swatch: "bg-danger" },
];

export default function DesignPage() {
  return (
    <Container className="space-y-14 py-12">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Design system</h1>
        <p className="text-muted">Tokens and components used across SoleStore.</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">
          Colors
        </h2>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {COLORS.map((color) => (
            <li key={color.name} className="space-y-2">
              <div className={`h-16 rounded-xl border border-line ${color.swatch}`} />
              <p className="font-mono text-xs text-muted">{color.name}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">
          Typography
        </h2>
        <div className="space-y-3">
          <p className="text-4xl font-bold tracking-tight">Display — 4xl bold</p>
          <p className="text-2xl font-semibold tracking-tight">Title — 2xl semibold</p>
          <p className="text-lg font-semibold">Heading — lg semibold</p>
          <p className="text-base">Body — base regular</p>
          <p className="text-sm text-muted">Secondary — sm muted</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">
          Buttons
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Add to cart</Button>
          <Button variant="secondary">Save for later</Button>
          <Button variant="ghost">Cancel</Button>
          <Button size="lg">Checkout</Button>
          <Button disabled>Disabled</Button>
          <ButtonLink href="/" variant="secondary">
            Link styled as button
          </ButtonLink>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">
          Badges
        </h2>
        <div className="flex flex-wrap gap-2">
          <Badge>New</Badge>
          <Badge tone="accent">Low stock</Badge>
          <Badge tone="success">In stock</Badge>
          <Badge tone="danger">Out of stock</Badge>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">
          Prices
        </h2>
        <div className="flex flex-col gap-1">
          <Price cents={12999} className="text-lg" />
          <Price cents={7999} />
          <Price cents={125000} />
        </div>
      </section>
    </Container>
  );
}