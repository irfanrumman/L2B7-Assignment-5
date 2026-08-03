# API Integration Map — RentNest Frontend

This document maps each frontend route/component to the backend API endpoint(s) it consumes.

**Backend base URL:** `process.env.BACKEND_API_URL`
**Auth:** JWT stored in `httpOnly` cookies (`accessToken`, `refreshToken`), forwarded to the backend via the `Cookie` header from Next.js Server Actions / Route Handlers.

---

## Public Routes

| Route | Component(s) | Backend Endpoint(s) |
|---|---|---|
| `/` | `HeroSection`, `HomePropertiesSection` | `GET /api/properties` (filtered client-side for `featured: true`, or by `?location=` from the hero search box) |
| `/properties` | `PropertyFiltersForm`, `PropertiesList`, `PropertyGrid`, `PropertyPagination` | `GET /api/properties` (query: `search`, `location`, `categoryId`, `minPrice`, `maxPrice`, `isAvailable`, `page`, `limit`), `GET /api/categories` |
| `/properties/[id]` | `PropertyDetailPage`, `PropertyDetailCTA`, `RentalRequestForm` | `GET /api/properties/:id`, `POST /api/rentals` (submit request), `GET /api/rentals` (check existing request) |

## Auth Routes

| Route | Component(s) | Backend Endpoint(s) |
|---|---|---|
| `/login` | `LoginForm` | `POST /api/auth/login` |
| `/register` | `RegisterForm` | `POST /api/auth/register` → auto-login via `POST /api/auth/login` |
| `proxy.ts` (middleware) | Token refresh | `POST /api/auth/refresh-token` |

## Tenant Routes

| Route | Component(s) | Backend Endpoint(s) |
|---|---|---|
| `/dashboard/tenant` | `TenantStats`, `TenantDashboardTabs`, `RentalRequestCard`, `PaymentHistoryCard` | `GET /api/rentals`, `GET /api/payments` |
| `/dashboard/tenant/requests/[id]` | Request detail page, `ReviewDialog` | `GET /api/rentals/:id`, `POST /api/reviews` |
| `/dashboard/tenant/requests/[id]/pay` | `PaymentInitiation` | `POST /api/payments/create` |
| `/payment/success` | `PaymentSuccessContent` | `POST /api/payments/confirm` |
| `/payment/cancel` | Static cancel page | — (no API call) |

## Landlord Routes

| Route | Component(s) | Backend Endpoint(s) |
|---|---|---|
| `/dashboard/landlord` | `LandlordPropertyList`, `RequestList` (optimistic UI) | `GET /api/properties` (client-filtered by `landlord.id`), `GET /api/landlord/requests` |
| `/dashboard/landlord/properties` | `LandlordPropertyList` | `GET /api/properties` (client-filtered), `DELETE /api/landlord/properties/:id` |
| `/dashboard/landlord/properties/new` | `CreatePropertyForm` | `POST /api/landlord/properties` |
| `/dashboard/landlord/properties/[id]` | `UpdatePropertyForm`, `CategorySelect` | `GET /api/properties/:id`, `PATCH /api/landlord/properties/:id`, `GET /api/categories` |
| `/dashboard/landlord/requests` | `RequestList` (Approve/Reject, optimistic UI via `useOptimistic`) | `GET /api/landlord/requests`, `PATCH /api/landlord/requests/:id` |

> **Note:** A dedicated `GET /api/landlord/properties` endpoint is not available on the backend. Landlord-owned properties are derived by fetching `GET /api/properties` and filtering client-side by `landlord.id === currentUser.id`.

## Admin Routes

| Route | Component(s) | Backend Endpoint(s) |
|---|---|---|
| `/dashboard/admin` | Stats cards, `UserManagementTable`, `AdminRentalTable`, property preview | `GET /api/admin/users`, `GET /api/admin/properties`, `GET /api/admin/rentals` |
| `/dashboard/admin/users` | `UserManagementTable`, `UserSearchBox` | `GET /api/admin/users` (query: `search`, `page`, `limit`), `PATCH /api/admin/users/:id` (ban/unban) |
| `/dashboard/admin/properties` | `AdminPropertyCard`, `PropertyFiltersForm`, `CategorySelect` | `GET /api/admin/properties`, `PATCH /api/admin/properties/:id` (toggle featured) |
| `/dashboard/admin/properties/[id]` | Property detail, `FeaturedToggle`, `PropertyRentalRequests` | `GET /api/properties/:id`, `PATCH /api/admin/properties/:id`, `GET /api/admin/rentals` (client-filtered by property) |
| `/dashboard/admin/rental-requests` | `AdminRentalTable` | `GET /api/admin/rentals` |
| `/dashboard/admin/categories` | `CategoryFormDialog`, `DeleteCategoryDialog` | `GET /api/categories`, `POST /api/categories/create`, `PATCH /api/categories/:id`, `DELETE /api/categories/delete/:id` |

---

## Error & Loading UX

- **Toast notifications** (`sonner`) on every mutating action (create, update, delete, approve/reject, ban/unban, payment).
- **Inline Zod validation** on Login and Register forms (client-side, pre-submit).
- **`error.tsx` / `global-error.tsx`** — React Error Boundaries catching unexpected server/client crashes.
- **`not-found.tsx`** — custom 404 page.
- **`loading.tsx`** and per-section `<Suspense>` boundaries with skeleton fallbacks (`PropertyCardSkeleton`) for streaming data.

## Route Protection

`src/proxy.ts` (Next.js Middleware) handles:
- Redirecting unauthenticated users away from protected routes to `/login`.
- Redirecting authenticated users away from `/login` and `/register` to their role-specific dashboard.
- Role-based access control: `TENANT`, `LANDLORD`, and `ADMIN` can only access their own `/dashboard/*` subtree; cross-role access redirects to `/not-found`.
- Silent access-token refresh via the refresh token cookie when the access token has expired.
