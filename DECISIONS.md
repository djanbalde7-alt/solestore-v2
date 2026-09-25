# Decisions

## 2026-09-24 — Project setup

- Next.js [version], App Router, TypeScript, Tailwind
- No `src/` directory: same structure as v1, nothing to relearn
- Repo `solestore-v2`: v1 stays online as reference

## 2026-09-24 — Data model (J2)

- Two connection URLs: pooled `DATABASE_URL` for the app,
  direct `DIRECT_URL` for migrations. Serverless opens many
  connections; migrations need a direct one.
- Prisma client stored on `globalThis` in development:
  hot reload would otherwise exhaust Neon connections.
- `prisma generate` in the build script: generated client
  is not committed, Vercel must rebuild it.
- Prices in cents (Int): Stripe format, no rounding errors.
- `Order.id` is a UUID: order numbers must not be guessable.
- `OrderItem.unitPrice` is frozen: the price paid, not the
  current price.
- `Product.active` for soft delete: sold products are never
  deleted.
- `brand` and `colorway` on Product: J13 generates descriptions
  from stored facts only — the model must not invent attributes.
- `Order.stripeSessionId` unique: idempotency enforced by the
  database, not only by an `if` in the webhook.
- `ProductView` with anonymous `sessionId`: needed for J11
  co-occurrence recommendations; `userId` optional, SetNull
  on account deletion.
- `SearchLog` with `resultCount`, no user link: baseline for
  J12 semantic search (zero-result rate before/after).
- `AiCall` postponed to J12: a table is created when something
  feeds it.

## 2026-09-24 — Seed and tests (J2)

- Fictional brands: a public site with real brands, fake prices
  and a real checkout is a needless risk.
- No Faker: products carry coherent facts (brand, model,
  colorway, category feature) so J12 semantic search has
  something real to find.
- Catalog built by a pure function (`prisma/catalog.ts`),
  written by a thin script (`prisma/seed.ts`): the logic is
  tested without a database.
- Deterministic catalog, no randomness: measurements in J12,
  J13 and J18 stay comparable across runs.
- Template descriptions on purpose: the "before" for J13.
- 5 products out of stock: J3 needs the out-of-stock state.
- Picsum images until J9 uploads.
- Seed wipes every table, orders included. Safe today (no
  orders). Before J7: separate development and production
  databases.
- `formatPrice` throws on a non-integer: a fractional cent is
  a bug, rounding would hide it.
- Tests run inside the build: a failing test blocks the
  Vercel deployment.
