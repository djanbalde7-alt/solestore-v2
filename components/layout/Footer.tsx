import { Container } from "../ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-line py-10 text-sm text-muted">
      <Container className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} SoleStore. Portfolio project.</p>
        <p>All brands are fictional. Payments run in test mode.</p>
      </Container>
    </footer>
  );
}