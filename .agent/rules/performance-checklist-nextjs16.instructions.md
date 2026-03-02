---
applyTo: "**"
---

# Next.js 16 Performance Checklist

## 🧩 Core Principle

AI-generated code must prioritize performance by default — leveraging server components for zero-overhead rendering, strategic memoization, and intelligent caching to deliver fast, scalable applications.

---

## 🎯 Pre-Deployment Performance Checklist

### Bundle Size & Code Splitting ✅

- [ ] **Root `layout.tsx` has NO `'use client'`**

```typescript
// ❌ WRONG
'use client';
export default function Layout() { ... }

// ✅ CORRECT
export default function Layout() { ... } // Server component
```

- Client components < 10% of total components
- Initial bundle < 200KB (`npm run build`)
- Large deps? Tree-shake or lazy load
- No unused dependencies

**Audit:**

```bash
grep -r "'use client'" src/

npx depcheck
npm prune
```

**Run:** `npm run build -- --analyze`

### Server Component Optimization ✅

- 90%+ components are server components
- Data fetching? → Server
- Static content? → Server
- SEO content? → Server
- No client-side database queries

```typescript
// ❌ WRONG (client)
"use client";
const products = await db.product.findMany();

// ✅ CORRECT (server)
const products = await db.product.findMany();
```

- No secrets exposed to client

```bash
# ❌ WRONG
NEXT_PUBLIC_DATABASE_URL=...

# ✅ CORRECT
DATABASE_URL=... # Server only
```

### Client Component Optimization ✅

- Expensive computations memoized

```typescript
const filtered = useMemo(() => {
  return products.filter((p) => p.inStock);
}, [products]);
```

- Callbacks stable with `useCallback`

```typescript
const handleClick = useCallback(
  (id) => {
    addToCart(id);
  },
  [addToCart]
);
```

- Child components React.memo'd

```typescript
const ProductCard = memo(({ product }) => <div>{product.name}</div>);
```

---

## ⚡ Data Fetching Performance

### Parallel Fetching (No Waterfalls) ✅

```typescript
// ❌ WRONG: Sequential (waterfall)
const user = await fetchUser();
const posts = await fetchUserPosts(user.id);

// ✅ CORRECT: Parallel
const [user, posts] = await Promise.all([fetchUser(), fetchUserPosts(userId)]);
```

### No N+1 Queries ✅

```typescript
// ❌ WRONG: N+1 (10 users = 11 queries)
const users = await db.user.findMany();
const posts = await Promise.all(
  users.map((u) => db.post.findMany({ where: { userId: u.id } }))
);

// ✅ CORRECT: 1 query
const users = await db.user.findMany({
  include: {
    posts: {
      where: { published: true },
    },
  },
});
```

### Cache Everything ✅

```typescript
// Static pages (forever cache)
export default async function StaticPage() {
  const data = await db.post.findMany(); // CDN cached
}

// ISR (time-based)
export const revalidate = 300; // 5 minutes

// Fetch cache
const data = await fetch(url, {
  next: { revalidate: 60 },
});
```

---

## 🚀 Rendering Performance

### Suspense Boundaries ✅

```typescript
export default function Dashboard() {
  return (
    <div>
      {/* Fast */}
      <h1>Dashboard</h1>

      {/* Slow - isolated */}
      <Suspense fallback={<StatsSkeleton />}>
        <ProductStats />
      </Suspense>
    </div>
  );
}
```

### Loading States ✅

```
app/
├── products/
│   ├── page.tsx
│   └── loading.tsx # Skeleton loader
└── cart/
    ├── page.tsx
    └── loading.tsx
```

### No Hydration Mismatches ✅

```typescript
// ❌ WRONG: Different server/client render
"use client";
export function Component() {
  return <div>{Math.random()}</div>; // Different values!
}

// ✅ CORRECT: Same render
export function Component() {
  const [randomId, setRandomId] = useState("");

  useEffect(() => {
    setRandomId(Math.random().toString());
  }, []);

  return <div>{randomId}</div>;
}
```

---

## 🖼️ Asset Optimization

### Images (Mandatory) ✅

```typescript
// ✅ ALWAYS use next/image
import Image from "next/image";

<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority // Above the fold only
  sizes="(max-width: 768px) 100vw, 50vw"
/>;
```

### Fonts (Mandatory) ✅

```typescript
// app/layout.tsx
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function Layout({ children }) {
  return (
    <html className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

---

## 💾 Caching Strategy

| Content Type       | Strategy         | Duration    |
| ------------------ | ---------------- | ----------- |
| Static Content     | CDN Forever      | -           |
| Frequently Updated | ISR              | 60s-1h      |
| User-Specific      | Dynamic          | Per request |
| Real-time          | Client WebSocket | -           |

```typescript
// Page-level
export const revalidate = 300; // 5 minutes

// Fetch-level
const data = await fetch(url, {
  next: { revalidate: 60 },
});

// After mutations
revalidatePath("/products");
revalidateTag("products");
```

---

## 📊 Performance Targets

| Metric            | Target  | Tool          |
| ----------------- | ------- | ------------- |
| Bundle Size       | < 200KB | npm run build |
| LCP               | < 2.5s  | Lighthouse    |
| FID               | < 100ms | Lighthouse    |
| CLS               | < 0.1   | Lighthouse    |
| TTFB              | < 400ms | WebPageTest   |
| Server Components | 90%+    | Code audit    |

---

## 🔍 Performance Audit Commands

```bash
# 1. Bundle analysis
npm run build -- --analyze

# 2. Lighthouse audit
npm run build
npx lighthouse http://localhost:3000 --output=html

# 3. Find unnecessary client components
grep -r "'use client'" src/ | wc -l

# 4. Check bundle size trend
npm run build | grep "○"

# 5. Web Vitals monitoring
npm install web-vitals
```

---

## 🚀 Quick Wins (1 Hour)

### 1. Remove Unnecessary 'use client' (30min)

```bash
grep -r "'use client'" src/components/server/

# Remove if no hooks used
```

### 2. Add Suspense Boundaries (15min)

```typescript
<Suspense fallback={<Skeleton />}>
  <SlowComponent />
</Suspense>
```

### 3. Use next/image Everywhere (10min)

```typescript
// Replace <img> tags
import Image from "next/image";
<Image src={src} width={w} height={h} alt="..." />;
```

### 4. Add ISR Caching (5min)

```typescript
export const revalidate = 300; // All static pages
```

---

## ✅ Pre-Merge Checklist

Run before every PR:

```bash
# [ ] Build succeeds (0 errors/warnings)
npm run build

# [ ] Bundle < 200KB
npm run build | grep "○"

# [ ] No hydration warnings
npm run dev # Check console

# [ ] Lighthouse > 90
npx lighthouse http://localhost:3000

# [ ] No N+1 queries (Prisma Studio)
npx prisma studio

# [ ] Cache revalidation works
# Test create/update → pages refresh
```

**Code Review Checklist:**

- No unnecessary `'use client'`
- Server data fetching (no client fetch)
- `useEffect` has cleanup + deps
- `useMemo`/`useCallback` only for expensive ops
- Images use `next/image`
- Mutations call `revalidatePath`

---

## 🛑 Performance Anti-Patterns

| Problem           | ❌ Code                          | ✅ Fix                                     |
| ----------------- | -------------------------------- | ------------------------------------------ |
| Client data fetch | `useEffect(() => fetch('/api'))` | Server component fetch                     |
| No Suspense       | `<SlowComponent />`              | `<Suspense><SlowComponent /></Suspense>`   |
| Missing memo      | `{items.map(...)}`               | `useMemo(() => items.map(...), [items])`   |
| Waterfall         | `await a(); await b();`          | `Promise.all([a(), b()])`                  |
| No ISR            | `fetch(url)`                     | `fetch(url, { next: { revalidate: 60 } })` |

---

## 📈 Monitoring Setup

```typescript
// lib/analytics.ts
import { onCLS, onFID, onLCP } from "web-vitals";

function sendToAnalytics(metric) {
  // Send to your analytics
  fetch("/api/metrics", {
    method: "POST",
    body: JSON.stringify(metric),
    keepalive: true,
  });
}

onCLS(sendToAnalytics);
onFID(sendToAnalytics);
onLCP(sendToAnalytics);
```

**Tools:**

- Vercel Analytics (free)
- Sentry Performance
- Datadog RUM

---

## 🎯 Performance Budget

```
CRITICAL: Block deployment if ANY fail
├── Bundle Size: < 200KB gzipped
├── LCP: < 2.5s
└── CLS: < 0.1

WARNING: Review before merge
├── FID: < 100ms
├── TTFB: < 400ms
└── Total Blocking Time: < 300ms
```
