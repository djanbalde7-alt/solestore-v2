const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatPrice(cents: number): string {
  if (!Number.isInteger(cents)) {
    throw new Error(`Price must be an integer number of cents, got ${cents}`);
  }
  return usd.format(cents / 100);
}