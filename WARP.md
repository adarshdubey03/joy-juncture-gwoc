# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands

### App lifecycle
- Development server: `npm run dev` (Next.js dev server on http://localhost:3000). You can also use `yarn dev`, `pnpm dev`, or `bun dev` as noted in `README.md`.
- Production build: `npm run build`.
- Start production server (after build): `npm run start`.

### Linting
- Run ESLint across the project: `npm run lint`.

### Database & Prisma
Prisma is configured in `prisma/schema.prisma` with the client generated to `src/generated/prisma`.

Common CLI commands (run from the project root):
- Apply schema changes and create a migration:
  - `npx prisma migrate dev --name <change-name>`
- Regenerate the Prisma client:
  - `npx prisma generate`
- (Optional) Inspect data with Prisma Studio:
  - `npx prisma studio`

### Tests
- There is currently no test runner or `test` script configured in `package.json`. If you add one, expose it via an npm script (for example, `test`) so agents can run it directly.

## Environment

Environment variables are managed via `.env` with an example in `.env.example`.

Key variables used in the codebase:
- Database and app URL (see `.env.example`):
  - `DATABASE_URL`
  - `RESEND_API_KEY`
  - `EMAIL_FROM`
  - `NEXT_PUBLIC_APP_URL`
  - `EMAIL_RETRY_ATTEMPTS`
  - `EMAIL_RETRY_DELAY_MS`
- NextAuth providers (see `src/auth.config.ts`):
  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`
  - (GitHub uses defaults from `next-auth/providers/github` and its own env vars if configured.)
- Twilio SMS (see `src/lib/sms.ts`):
  - `TWILIO_ACCOUNT_SID`
  - `TWILIO_AUTH_TOKEN`
  - `TWILIO_PHONE_NUMBER`

Create a local `.env` based on `.env.example` and add any additional variables above as needed.

## Architecture overview

### Framework, routing, and layout
- This is a Next.js (App Router) TypeScript project with source under `src/`.
- Path aliasing: `@/*` maps to `./src/*` (see `tsconfig.json`); imports use this alias extensively (for example, `@/lib/db`, `@/schemas`).
- Application routes live under `src/app`:
  - Root layout: `src/app/layout.tsx` sets up global fonts (Geist, Inter, Kalam, Fredoka), imports `globals.css`, and wraps all pages in `AuthSessionProvider` (`src/components/providers/session-provider.tsx`), which itself wraps children with NextAuth's `SessionProvider`.
  - Marketing / customer-facing routes: `/` (home), `/about`, `/blogs`, `/experiences/*`, `/shop`, `/shop/[slug]` are implemented under `src/app` and use presentational components from `src/components`.
  - Auth routes are grouped in `src/app/(auth)` and include login, register, reset, new password, verification, and new verification flows. They share a dedicated layout in `(auth)/layout.tsx`.
  - Admin panel routes are grouped in `src/app/(admin)/admin` with a dashboard, products list, and orders list. The admin layout (`src/app/(admin)/admin/layout.tsx`) renders `AdminSidebar` and page content; role-checking logic based on `UserRole.ADMIN` exists but is currently commented out.
  - NextAuth HTTP handlers are exposed via `src/app/api/auth/[...nextauth]/route.ts`, which re-exports `GET` and `POST` from `src/auth.ts`.

### Authentication, authorization, and middleware
- Core NextAuth configuration:
  - `src/auth.config.ts` defines the base `NextAuthConfig`, including GitHub and Google providers, with Google client credentials read from env.
  - `src/auth.ts` calls `NextAuth` with:
    - `PrismaAdapter` bound to the Prisma client (`db` from `src/lib/db.ts`).
    - A credentials provider that authenticates users by email or phone number plus password, using `LoginSchema` from `src/schemas` and bcrypt to compare hashed passwords stored in the `User` model.
    - JWT-based sessions where the user's `id` and `role` (from the generated Prisma `UserRole` enum) are set on both the token and `session.user`.
    - An event handler to mark `emailVerified` when OAuth accounts are linked.
    - Custom session cookie configuration tuned for security (httpOnly, sameSite, secure in production).
- Session-centric hooks and providers:
  - `src/components/providers/session-provider.tsx` wraps the application with `SessionProvider`.
  - `src/hooks/use-current-user.ts` and `src/hooks/use-current-role.ts` are lightweight client hooks built on `useSession` to access the current user and role.
- Route classification and middleware:
  - `src/routes.ts` defines `publicRoutes`, `authRoutes`, `apiAuthPrefix`, and `DEFAULT_LOGIN_REDIRECT` (`/shop`) for use across the app.
  - `src/middleware.ts` uses `NextAuth`'s `auth` wrapper with `authConfig` to attach authentication context to requests and applies route-based logic:
    - Detects API auth routes (`/api/auth`), public routes, and auth routes based on `src/routes.ts`.
    - Applies redirects for logged-in users trying to access auth routes and (commented) protection for non-public routes when unauthenticated.
    - Unconditionally attaches security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`) to the `NextResponse` for non-static routes.
  - Admin-only gating is intended to be enforced both in middleware/route classification and in the admin layout; currently the explicit admin role check in `src/app/(admin)/admin/layout.tsx` is commented out and should be revisited when hardening access control.

### Persistence and domain model (Prisma + Zod)
- Database access:
  - `prisma/schema.prisma` is the authoritative schema. The Prisma client is generated into `src/generated/prisma` and imported via `@/generated/prisma`.
  - `src/lib/db.ts` instantiates `PrismaClient` using `@prisma/adapter-pg` with the `DATABASE_URL` connection string, and caches the client on `global` to avoid multiple instances in development.
- Domain modeling highlights (from `schema.prisma`):
  - Users & auth: `User`, `VerificationToken`, `PasswordResetToken`, `Wallet`, and `PointTransaction` capture user accounts, roles, login security, balances, and point transactions.
  - Catalog & taxonomy:
    - `Product` is the core model, with pricing, stock, media, gameplay info, SEO, badges, and various flags (`isActive`, `isFeatured`, `isNewArrival`, `isBestSeller`).
    - Associated nested and join models: `ProductImage`, `GameplayInfo`, `StoreInfo`, `KeyFeature`, `ProductFAQ`, `ProductBadge`/`Badge`, `ProductCategory`/`Category`, `ProductTag`/`Tag`, `ProductOccasion`/`Occasion`, `ProductMood`/`Mood`.
  - Cart & wishlist: `CartItem`, `WishlistItem` tie users to their in-progress selections.
  - Orders & payments: `Order`, `OrderItem`, `OrderStatusChange`, `RefundRequest`, `ShippingRate`, `Coupon`, `CouponProduct`, `CouponCategory`, `CouponUsage` implement a full order lifecycle and discount system.
  - Events & puzzles: `Event`, `EventRegistration`, `EventAttendance`, `Puzzle`, `PuzzleAttempt` support events, attendance tracking, and puzzle-based gamification.
  - Content & enquiries: `Content`, `ContentCategory`, `ContentTag`, and `CorporateEnquiry` handle blog-style content and corporate inquiries.
  - Analytics & security: `ProductView`, `SearchQuery`, `RateLimit`, `InventoryHold`, `InventoryLog` enable tracking and operational safeguards.
- Zod schemas mirror and constrain this domain on the application side:
  - `src/schemas/product.ts` defines `ProductSchema` and nested schemas (`ProductImageSchema`, `GameplayInfoSchema`, `StoreInfoSchema`, `KeyFeatureSchema`, `ProductFAQSchema`), including arrays of taxonomy IDs and status flags; it is used both in server actions and in the admin product form.
  - `src/schemas/order.ts` defines `OrderSchema`, `OrderItemSchema`, and related enums/schemas for shipping, payment, coupons, refunds, and inventory events.
  - `src/schemas/user.ts` defines `UserRoleEnum`, `UserSchema`, and wallet/point transaction schemas.
  - `src/schemas/event.ts`, `gamification.ts`, and `taxonomy.ts` (exported via `src/schemas/index.ts`) cover events, puzzles, and taxonomy administration.
  - `src/schemas/index.ts` also defines auth-related schemas (`LoginSchema`, `RegisterSchema`, `ResetSchema`, `NewPasswordSchema`) and re-exports the domain schemas so they can be imported from `@/schemas` in both client and server code.

### Business logic and server actions

#### Authentication and user flows
- Server actions under `src/actions` orchestrate validation, data access, and notifications:
  - `src/actions/login.ts`:
    - Uses `checkRateLimit` from `src/lib/rate-limit.ts` to enforce per-IP limits on login attempts.
    - Validates input with `LoginSchema` and looks up users by email or phone number (`db.user.findFirst` with an `OR` condition, plus optional E.164 parsing via `libphonenumber-js`).
    - Handles unverified users by generating verification tokens via `generateVerificationToken` (`src/lib/tokens.ts`) and sending email or SMS codes via `sendVerificationEmail` (`src/lib/mail.ts`) and `sendVerificationSMS` (`src/lib/sms.ts`).
    - Delegates actual authentication to NextAuth's `signIn("credentials", ...)`, relying on the credentials provider logic in `src/auth.ts`.
  - Additional actions handle logout, registration, new-password, password reset, and verification using a similar pattern: Zod validation from `src/schemas`, Prisma queries through `db`, tokens via `src/lib/tokens.ts`, and notifications via `mail.ts`/`sms.ts`.

#### Admin catalog management
- Server-side product logic lives in `src/actions/admin/product-actions.ts`:
  - Query actions (`getProducts`, `getProduct`) fetch products with their related categories, badges, tags, occasions, moods, gameplay info, store info, images, key features, FAQs, and recent inventory logs (including the user who made each change).
  - `createProduct`:
    - Validates input with `ProductSchema`.
    - Derives a slug from the name if one is not provided.
    - Creates the core `Product` record and associated join records for categories, tags, occasions, moods, badges, related products, and nested models for images, gameplay info, store info, key features, and FAQs.
    - Calls `revalidatePath("/admin/products")` after successful creation.
  - `updateProduct`:
    - Runs within a Prisma transaction.
    - Compares existing stock with the incoming `stockQuantity` and, when changed, creates an `InventoryLog` entry with the difference and the current admin user (`auth()` from `@/auth`).
    - Updates the `Product` fields and completely refreshes the join tables (delete-many + recreate) for categories, tags, occasions, moods, and badges.
    - Upserts `gameplayInfo` and `storeInfo`, and replaces images, key features, and FAQs to reflect the latest state.
    - Revalidates both the products list and individual product pages.
  - Additional helpers support simple status toggling and deletion.
- Admin catalog UI ties directly into these actions:
  - `src/components/admin/product-form.tsx` is a complex client form powered by `react-hook-form` + `zodResolver(ProductSchema)`, organized into tabs (basic info, gameplay, media, features/FAQs, categorization, inventory).
  - It maps Prisma entities (`Category`, `Badge`, `Tag`, `Occasion`, `Mood`, related `Product`s) into checkbox/tag selection controls and writes back ID arrays that align with `ProductSchema` and the server actions.

#### Admin order management
- Server-side order logic is implemented in `src/actions/admin/order-actions.ts`:
  - `getOrders(filters)` builds a Prisma `where` condition from a rich filter object (search string across multiple fields, order status list, payment status/method lists, date range, amount range) and supports pagination (`page`, `limit`) and sorting (`sortBy`, `sortOrder`).
  - It fetches orders with user and item summaries, totals the count, and computes aggregate stats (total revenue, average order value), as well as a per-status breakdown using `groupBy`.
  - Additional functions manage:
    - Single-order retrieval with detailed relations (`getOrder`).
    - Status changes (`updateOrderStatus`) with audit trail entries in `OrderStatusChange` and path revalidation.
    - Tracking updates (`updateTracking`), refund processing (`processRefund`), payment verification (`verifyPayment`), bulk status updates (`bulkUpdateOrderStatus`), CSV export (`exportOrders`), analytics (`getOrderStats`), shipping estimates (`calculateShipping`), and basic order validation (`validateOrder`).
- The admin orders UI is built around these server actions:
  - `src/app/(admin)/admin/orders/page.tsx` is a client component that maintains filter state, syncs it with URL query parameters, and uses `useEffect` to call `getOrders` whenever filters or pagination change.
  - `src/components/admin/orders/orders-toolbar.tsx` encapsulates the filter UI (search, status chips, payment status/method filters, date presets based on `DATE_RANGE_PRESETS`, amount range fields) and emits an `OrderFiltersState` object.
  - `src/components/admin/orders/order-stats-cards.tsx` and `order-status-badge.tsx` present aggregate stats and per-order status display.

#### Cross-cutting services: rate limiting, tokens, mail, SMS
- Rate limiting:
  - `src/lib/rate-limit.ts` uses the `RateLimit` model to store `(ip, action)` counters with expiration. It resets expired entries, increments counts for active entries, and returns a boolean indicating whether the action is allowed. This is currently applied to login attempts and can be reused for other sensitive workflows.
- OTP tokens:
  - `src/lib/tokens.ts` centralizes creation and lookup of password reset and verification tokens:
    - Uses cryptographically secure 6-digit numeric codes via `randomInt` for both email and phone OTPs.
    - Enforces per-identifier rate limiting for password reset requests (minimal time between codes), deleting any previous token before creating a new one.
    - Supports both email and phone channels for password reset and verification by storing appropriate fields in `PasswordResetToken` and `VerificationToken`.
- Emails:
  - `src/lib/mail.ts` is a wrapper around the Resend client with:
    - A generic `sendWithRetry` helper that implements exponential backoff using `EMAIL_RETRY_ATTEMPTS` and `EMAIL_RETRY_DELAY_MS`.
    - HTML email templates for verification and password reset that embed the OTP code and use `NEXT_PUBLIC_APP_URL` as a base for support links.
    - A development-mode fallback which logs OTPs to the console when `RESEND_API_KEY` is not set.
- SMS:
  - `src/lib/sms.ts` wraps the Twilio client, sending simple OTP SMS messages when `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `TWILIO_PHONE_NUMBER` are all configured, and logging mock messages otherwise.

### UI layer and styling
- Design system components:
  - Reusable UI primitives live under `src/components/ui` (accordion, avatar, badge, button, card, checkbox, command palette, dialog, dropdown-menu, form, image-upload, input, label, popover, select, separator, switch, table, tabs, textarea, and more), providing a shared Tailwind-based design language across pages.
  - Rich text editing uses TipTap via `@tiptap/pm`, `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-link`, and `@tiptap/extension-underline` integrated in `src/components/ui/editor.tsx`.
- Marketing and shop UI:
  - Home page composition (`src/app/page.tsx`) pulls together hero, about, play style, current happenings, proof-of-joy, gamification teaser, and footer components from `src/components/*`.
  - The shop list (`src/app/shop/page.tsx`) presents a client-side filtered gallery of game entries backed by a static `GAMES` array; filters are grouped by game type, occasion, and mood.
  - Product detail (`src/app/shop/[slug]/page.tsx`) currently uses a hard-coded `GAME` object to render a rich product detail view (hero image, specs, story, how-to-play steps, ideal-for list, visual walkthrough). This is an obvious extension point to wire up real product data from Prisma or from `src/lib/products.ts`.
- Admin UI:
  - Admin layout and navigation are implemented in `src/app/(admin)/admin/layout.tsx` and `src/components/admin/sidebar.tsx`.
  - Product management forms and helpers live in `src/components/admin` (for example, `product-form.tsx`, `faq-manager.tsx`, `key-features-manager.tsx`, `order-status-form.tsx`). They closely align their data structures with both the Zod schemas under `src/schemas` and the Prisma models.
- Styling and theming:
  - Global styles are defined in `src/app/globals.css`, which:
    - Imports Tailwind CSS v4 via `@import "tailwindcss";` and animation utilities via `@import "tw-animate-css";`.
    - Defines a design system using CSS custom properties and the `@theme` and `@layer` directives for colors, radii, charts, and sidebar styling in both light and dark modes.
    - Applies base Tailwind utilities to `*` and `body`, including `bg-background` and `text-foreground`.
    - Includes custom utility classes and keyframes (for example, `hero-video-mask`, `playstyle-marquee`).
  - Typography is driven by the fonts loaded in `src/app/layout.tsx` and wired into CSS via custom properties, with Fredoka used as the primary font on `body`.

### Conventions and extension points
- Imports and typing:
  - Prefer `@/*` imports over deep relative paths.
  - Use generated Prisma types/enums from `@/generated/prisma` when you need strongly typed domain values (for example, `UserRole`, `OrderStatus`, `PaymentStatus`).
- Evolving the domain and admin tools:
  - When changing the data model, update `prisma/schema.prisma`, run `npx prisma migrate dev` and `npx prisma generate`, and then update the corresponding Zod schemas under `src/schemas/*`.
  - For admin-facing functionality, keep server actions in `src/actions/admin` and UI in `src/components/admin`, using shared Zod schemas from `@/schemas` to keep validation consistent.
  - If you add new protected routes, update `src/routes.ts`, `src/middleware.ts`, and, where relevant, admin layouts to ensure authentication and authorization are enforced consistently.
