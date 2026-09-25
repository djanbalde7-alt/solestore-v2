import Link from "next/link";
import { Container } from "../ui/Container";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          SoleStore
        </Link>

        <nav aria-label="Main">
          <ul className="flex items-center gap-6 text-sm text-muted">
            <li>
              <Link href="/products" className="hover:text-ink">
                Shop
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}