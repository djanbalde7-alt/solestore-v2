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

## 2026-09-25 — Tooling versions (J2)

- `@types/node` aligned with the local Node major version:
  Vitest 5 requires @types/node 22 or 24+, the Next.js
  template shipped 20.
- No `--force` / `--legacy-peer-deps`: they silence the
  conflict locally, and Vercel's install would still fail.
- Major versions pinned for core tools (`prisma@7`,
  `vitest@5`): upgrades are a decision, not a side effect.
- Vercel Node.js version set to the same major as local.

## 2026-09-25 — Design system (J3)

- Semantic color tokens in `@theme` (ink, muted, line, accent…):
  components pick a role, not a shade.
- Accent `#c2410c`, not `#ea580c`: white text on the brighter
  orange fails contrast (3.6:1); the darker one passes (5.2:1).
- `faint` never carries important text (2.6:1 on white).
- Fonts in `@theme inline`: Next.js defines the font variable
  on `<body>`, not on the root.
- Template's `body { font-family: Arial }` removed: it was
  overriding Geist since J1.
- No dark mode: doubles design work per component, not needed
  to sell. Backlog v3.
- Components live in `components/`, not in `app/`: `app/`
  holds routes only.
- Buttons are at least 44px tall (`h-11`): minimum touch target.
- `Button` vs `ButtonLink`: an action and a navigation are
  different HTML elements, sharing one `buttonClasses()`.
- `type="button"` by default: prevents accidental form submits.
- Badges always carry text: color never carries meaning alone.
- Tailwind classes are always written in full: generated
  class names are never detected.
- `/design` reference page, `noindex`.

## 2026-09-25 — Catalog pages (J3)

- All reads go through `lib/queries.ts`: pages never call
  Prisma directly, and `active: true` cannot be forgotten.
- Explicit `select` on every query: cards do not load
  descriptions they never show.
- Deterministic ordering: `createdAt` ties broken by `id`.
- Out-of-stock products listed last, never hidden: hiding
  breaks shared links. `inStockFirst` is pure and tested.
- Home features in-stock products only: a featured product
  must be buyable.
- Low-stock badge only at 5 or fewer, and only when true:
  no invented urgency.
- ISR, `revalidate = 3600` on catalog pages; admin writes will
  call `revalidatePath` (J9).
- `generateStaticParams` prebuilds the category pages; new
  categories are rendered on first visit.
- React `cache()` on `getCategoryBySlug`: metadata and page
  share one query.
- `next/image` with `sizes` matching the 2/3/4-column grid:
  without it, cards download full-width images.
- Empty states require an action (enforced by the type).
- Skeletons reuse the grid's exact classes: no layout shift.
- `formatCount` handles "1 pair" vs "10 pairs".
