export function inStockFirst<T extends { stock: number }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => Number(b.stock > 0) - Number(a.stock > 0)
  );
}