# Dashboard Architecture — Full Task Breakdown

> [!NOTE]
> **localStorage limitation**: Tokens live in `localStorage` and are invisible to Next.js middleware. If server-side route protection is needed later, tokens must move to `httpOnly` cookies. For now, client-side [AuthProvider](file:///home/nour/Desktop/Adwatt/Willzy-Frontend/contexts/AuthProvider.tsx#48-133) handles all auth guards.

---

## Phase 1: Foundation ✅

- [x] **1.1** Create [contexts/AuthProvider.tsx](file:///home/nour/Desktop/Adwatt/Willzy-Frontend/contexts/AuthProvider.tsx)
- [x] **1.2** Create [data/dummy-dashboard-data.ts](file:///home/nour/Desktop/Adwatt/Willzy-Frontend/data/dummy-dashboard-data.ts)
- [x] **1.3** Update [lib/api/auth.ts](file:///home/nour/Desktop/Adwatt/Willzy-Frontend/lib/api/auth.ts) — clear `guestMode` on logout
- [x] **1.4** Update [components/SignUp.tsx](file:///home/nour/Desktop/Adwatt/Willzy-Frontend/components/SignUp.tsx) — store guest flag

## Phase 2: i18n ✅

- [x] **2.1** Add `dashboard` section to [dictionaries/en.json](file:///home/nour/Desktop/Adwatt/Willzy-Frontend/dictionaries/en.json)
- [x] **2.2** Add matching `dashboard` section to [dictionaries/ar.json](file:///home/nour/Desktop/Adwatt/Willzy-Frontend/dictionaries/ar.json)

## Phase 3: Route Group + Layout ✅

- [x] **3.1** Create [app/[lang]/(dashboard)/layout.tsx](file:///home/nour/Desktop/Adwatt/Willzy-Frontend/app/%5Blang%5D/%28dashboard%29/layout.tsx) + [DashboardLayoutClient.tsx](file:///home/nour/Desktop/Adwatt/Willzy-Frontend/app/%5Blang%5D/%28dashboard%29/DashboardLayoutClient.tsx)
- [x] **3.2** Move dashboard overview into route group
- [x] **3.3** Create workspaces page
- [x] **3.4** Create campaigns page
- [x] **3.5** Create market-overview page
- [x] **3.6** Create analytics page
- [x] **3.7** Create settings/brand-identity page
- [x] **3.8** Create settings/manage-workspace page

## Phase 4: Component Refactoring ✅

- [x] **4.1** Refactor [DashboardSidebar.tsx](file:///home/nour/Desktop/Adwatt/Willzy-Frontend/components/dashboard/DashboardSidebar.tsx) — i18n, wired nav, context, guest banner, logout
- [x] **4.2** Refactor [DashboardPageClient.tsx](file:///home/nour/Desktop/Adwatt/Willzy-Frontend/components/DashboardPageClient.tsx) — content-only, uses [useAuth()](file:///home/nour/Desktop/Adwatt/Willzy-Frontend/contexts/AuthProvider.tsx#35-42)
- [x] **4.3** Remove old `app/[lang]/dashboard/page.tsx`

## Phase 5: Verification ✅

- [x] **5.1** `npm run build` — exit code 0, all routes generated for en/ar
