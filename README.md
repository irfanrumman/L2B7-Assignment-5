T RentNest — Frontend
 
A modern, responsive Next.js application for a rental property marketplace. Landlords list and manage properties, tenants browse and request rentals with secure Stripe payments, and admins moderate the platform — all through role-based dashboards.
 
> This is a frontend-only project. It consumes a separate backend API (Node.js + Express + Prisma + PostgreSQL).
 
## Tech Stack
 
- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Forms & Validation:** Zod, React Server Actions
- **State:** React Context (Auth), Server/Client Component split
- **Notifications:** Sonner (toasts)
- **Payments:** Stripe Checkout
- **Package Manager:** pnpm
## Getting Started
 
### 1. Clone and install
 
```bash
git clone <repo-url>
cd <project-folder>
pnpm install
```
 
### 2. Environment variables
 
Copy `.env.example` to `.env.local` and fill in the real values:
 
```bash
cp .env.example .env.local
```
 
| Variable | Description |
|---|---|
| `BACKEND_API_URL` | Base URL of the backend API |
| `JWT_ACCESS_SECRET` | Must match the backend's access token secret |
| `JWT_REFRESH_SECRET` | Must match the backend's refresh token secret |
 
### 3. Run the development server
 
```bash
pnpm dev
```
 
Open [http://localhost:3000](http://localhost:3000) in your browser.
 
### 4. Build for production
 
```bash
pnpm build
pnpm start
```
 
## Project Structure
 
```
src/
├── app/                  # Next.js App Router pages
│   ├── (auth)/            # Login, Register
│   ├── (main)/             # Public: home, properties browsing/detail
│   ├── dashboard/          # Protected: tenant/landlord/admin dashboards
│   └── payment/            # Stripe success/cancel pages
├── components/
│   ├── ui/                # shadcn/ui primitives
│   └── shared/             # Reusable components (cards, grids, forms)
├── lib/                  # Types, validations, utils
├── service/               # Auth-related server-side services
└── proxy.ts              # Route protection & role-based access (middleware)
```
 
## Roles
 
| Role | Dashboard | Key Capabilities |
|---|---|---|
| **Tenant** | `/dashboard/tenant` | Browse properties, submit rental requests, pay via Stripe, leave reviews |
| **Landlord** | `/dashboard/landlord` | List/edit/delete properties, approve/reject rental requests |
| **Admin** | `/dashboard/admin` | Manage users (ban/unban), moderate listings, manage categories, mark properties as featured |
 
## Documentation
 
See [`API_INTEGRATION.md`](./API_INTEGRATION.md) for a full mapping of frontend routes to backend API endpoints.
 
## Known Limitations
 
- The backend does not expose a dedicated `GET /api/landlord/properties` endpoint; landlord-owned properties are derived by filtering the public `GET /api/properties` response client-side.
- Property images are single-URL only (no multi-image gallery), matching the backend's data model.
 