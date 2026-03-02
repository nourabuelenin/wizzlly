---
applyTo: "**"
---

# Next.js 16 Anti-Patterns - What NOT to Do

## 🧩 Core Principle

AI-generated code must actively avoid 12 critical anti-patterns that cause 90% of Next.js 16 bugs, performance issues, memory leaks, and security vulnerabilities.

---

## 🔴 CRITICAL ANTI-PATTERNS (Fix Immediately)

### 1. **`'use client'` on Root Layout/Page**

**Severity**: 🔴 CRITICAL | **Impact**: 70% bundle bloat

**❌ WRONG:**

```typescript
// app/layout.tsx or app/page.tsx
"use client"; // ❌ Makes ENTIRE app client-side!

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

**Result:** Zero SSR benefits, massive JS bundle, slow load

**✅ FIX:**

```typescript
// app/layout.tsx (SERVER by default)
export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

### 2. Client-Side Data Fetching (Broken SEO)

**Severity:** 🔴 CRITICAL | **Impact:** No SEO, hydration mismatch

**❌ WRONG:**

```typescript
"use client";
export function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  // ❌ Problems:
  // - Empty page for SEO
  // - Hydration mismatch warning
  // - Waterfall loading
}
```

**✅ FIX:**

```typescript
// Server component (data in HTML)
export default async function ProductsPage() {
  const products = await db.product.findMany();
  return <ProductList products={products} />;
}
```

### 3. No useEffect Cleanup (Memory Leaks)

**Severity:** 🔴 CRITICAL | **Impact:** Duplicate listeners, leaks

**❌ WRONG:**

```typescript
useEffect(() => {
  window.addEventListener("resize", handler); // ❌ Never removed
  const socket = new WebSocket(url); // ❌ Never closed
  const timer = setInterval(tick, 1000); // ❌ Never cleared
});
```

**✅ FIX:**

```typescript
useEffect(() => {
  const handler = () => console.log("resize");
  window.addEventListener("resize", handler);
  const socket = new WebSocket(url);
  const timer = setInterval(tick, 1000);

  return () => {
    // ✅ ALWAYS cleanup
    window.removeEventListener("resize", handler);
    socket.close();
    clearInterval(timer);
  };
}, []);
```

### 4. Missing useEffect Dependencies (Stale Closures)

**Severity:** 🔴 CRITICAL | **Impact:** Silent data bugs

**❌ WRONG:**

```typescript
function UserProfile({ userId }) {
  useEffect(() => {
    fetch(`/api/user/${userId}`).then(setUser); // ❌ userId not in deps
  }, []); // When userId changes → still fetches OLD userId!
}
```

**✅ FIX:**

```typescript
function UserProfile({ userId }) {
  useEffect(() => {
    fetch(`/api/user/${userId}`).then(setUser);
  }, [userId]); // ✅ Re-runs when userId changes
}
```

### 5. Exposing Secrets in NEXT*PUBLIC*

**Severity:** 🔴 CRITICAL | **Impact:** Security breach

**❌ WRONG:**

```bash
# .env.local
NEXT_PUBLIC_STRIPE_SECRET=sk_live_xxx      # ❌ Visible in browser!
NEXT_PUBLIC_DATABASE_URL=postgres://...    # ❌ Full DB exposed!
NEXT_PUBLIC_API_KEY=sk_live_stripe         # ❌ Attacker uses your quota
```

**✅ FIX:**

```bash
# .env.local (server-only)
STRIPE_SECRET=sk_live_xxx
DATABASE_URL=postgres://...
API_KEY=sk_live_stripe

# .env.local (public URLs only)
NEXT_PUBLIC_API_URL=https://api.example.com
```

### 6. No Cache Revalidation After Mutations

**Severity:** 🔴 CRITICAL | **Impact:** Stale data everywhere

**❌ WRONG:**

```typescript
"use server";
export async function updateProduct(id, data) {
  await db.product.update({ where: { id }, data });
  // ❌ Users still see old data!
}
```

**✅ FIX:**

```typescript
"use server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function updateProduct(id, data) {
  await db.product.update({ where: { id }, data });

  revalidatePath("/products"); // ✅ List page
  revalidatePath(`/products/${id}`); // ✅ Detail page
  revalidateTag("products"); // ✅ All product pages
}
```

---

## 🟠 HIGH SEVERITY ANTI-PATTERNS

### 7. Conditional Hooks

**Severity:** 🟠 HIGH | **Impact:** State corruption

**❌ WRONG:**

```typescript
function Component({ showForm }) {
  if (showForm) {
    const [formData, setFormData] = useState({}); // ❌ Order changes!
  }
  const [count, setCount] = useState(0); // ❌ Gets wrong state!
}
```

**✅ FIX:**

```typescript
function Component({ showForm }) {
  const [formData, setFormData] = useState({});
  const [count, setCount] = useState(0);

  if (showForm) {
    // ✅ Use conditionally inside
  }
}
```

### 8. Objects/Functions in Dependencies

**Severity:** 🟠 HIGH | **Impact:** Effects run every render

**❌ WRONG:**

```typescript
const config = { timeout: 5000 };
useEffect(() => {
  fetch(url, config); // ❌ New object every render
}, [config]); // Effect runs EVERY render!

const handler = () => console.log("click");
useEffect(() => {
  window.addEventListener("click", handler); // ❌ Runs every render
}, [handler]);
```

**✅ FIX:**

```typescript
const config = useMemo(() => ({ timeout: 5000 }), []);
useEffect(() => {
  fetch(url, config);
}, [config]); // ✅ Stable reference

const handler = useCallback(() => {
  console.log("click");
}, []);
useEffect(() => {
  window.addEventListener("click", handler);
}, [handler]); // ✅ Stable reference
```

### 9. Hydration Mismatches

**Severity:** 🟠 HIGH | **Impact:** Console errors, flashing UI

**❌ WRONG:**

```typescript
"use client";
export function Component() {
  return <div>{Math.random()}</div>; // ❌ Different server/client
  // return <div>{window.innerWidth}</div>;  // ❌ window undefined on server
}
```

**✅ FIX:**

```typescript
"use client";
export function Component() {
  const [randomId, setRandomId] = useState("");

  useEffect(() => {
    setRandomId(Math.random().toString());
  }, []);

  return <div>{randomId}</div>; // ✅ Same on server/client
}
```

### 10. Hooks in Server Components

**Severity:** 🟠 HIGH | **Impact:** Runtime crash

**❌ WRONG:**

```typescript
// app/page.tsx
export default function Page() {
  const [state, setState] = useState(null); // ❌ CRASHES!
  return <div>{state}</div>;
}
```

**✅ FIX:**

```typescript
// Server component (no hooks)
export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}
```

---

## 🟡 MEDIUM SEVERITY ANTI-PATTERNS

### 11. N+1 Database Queries

**Severity:** 🟡 MEDIUM | **Impact:** Slow page load

**❌ WRONG:**

```typescript
const users = await db.user.findMany(); // 1 query
for (const user of users) {
  user.posts = await db.post.findMany({
    // N queries!
    where: { userId: user.id },
  });
}
```

**✅ FIX:**

```typescript
const users = await db.user.findMany({
  include: {
    posts: {
      where: { published: true },
    },
  },
}); // ✅ 1 query total
```

### 12. Over-Memoization

**Severity:** 🟡 MEDIUM | **Impact:** Wasted CPU/memory

**❌ WRONG:**

```typescript
const doubled = useMemo(() => count * 2, [count]); // ❌ Trivial computation
const Button = memo(
  (
    { onClick } // ❌ Simple component
  ) => <button onClick={onClick}>Click</button>
);
```

**✅ FIX:**

```typescript
// Only expensive operations
const expensiveFilter = useMemo(() => {
  return products
    .filter((p) => p.inStock)
    .sort((a, b) => b.price - a.price)
    .slice(0, 10);
}, [products]);

// Simple cases: no memo needed
<button onClick={onClick}>Click</button>;
```

---

## 📊 Anti-Pattern Priority Matrix

| #   | Anti-Pattern       | Severity | Fix Time | Business Impact  |
| --- | ------------------ | -------- | -------- | ---------------- |
| 1   | Root 'use client'  | 🔴       | 5min     | 70% bundle bloat |
| 2   | Client data fetch  | 🔴       | 15min    | Broken SEO       |
| 3   | No cleanup         | 🔴       | 10min    | Memory leaks     |
| 4   | Missing deps       | 🔴       | 15min    | Stale data       |
| 5   | Secret exposure    | 🔴       | 5min     | Security breach  |
| 6   | No revalidation    | 🔴       | 10min    | Stale content    |
| 7   | Conditional hooks  | 🟠       | 5min     | State bugs       |
| 8   | Objects in deps    | 🟠       | 10min    | Performance      |
| 9   | Hydration mismatch | 🟠       | 15min    | UI broken        |
| 10  | Hooks in server    | 🟠       | 5min     | Crashes          |
| 11  | N+1 queries        | 🟡       | 20min    | Slow DB          |
| 12  | Over-memoization   | 🟡       | 10min    | Waste            |

---

## ✅ Pre-Commit Code Review Checklist

Run these checks before every push:

```bash
# [ ] No root 'use client'
grep -l "'use client'" app/ | grep -E "(layout.tsx|page.tsx)"

# [ ] No client data fetching
grep -A5 -B5 "useEffect.*fetch" src/ | grep "'use client'"

# [ ] Secrets safe
grep -r "NEXT_PUBLIC_" .env* | grep -E "(SECRET|KEY|PASS)"

# [ ] Mutations revalidate
grep -r "db\..*update\|create\|delete" actions/ | xargs grep "revalidate"

# [ ] Build succeeds
npm run build

# [ ] No hydration warnings
npm run dev # Check console
```

---

## 🚨 Emergency Fix Order

If your app is slow/broken, fix these FIRST:

1. Remove `'use client'` from `app/layout.tsx` (5min, 70% perf gain)
2. Move data fetching to server components (15min, fixes SEO)
3. Add `revalidatePath()` to all mutations (10min, fixes stale data)
4. Add cleanup to all `useEffect` (10min, stops leaks)
5. Fix missing `useEffect` dependencies (15min, fixes stale data)

---

## 🎓 Complete "Before/After" Example

**❌ BROKEN CODE:**

````typescript
'use client'; // ❌ Root client
export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(setProducts);
  }, []); // ❌ Missing deps, no cleanup

  return <div>{products.map(p => <div>{p.name}</div>)}</div>;
}
✅ FIXED CODE:

```typescript
// app/products/page.tsx (SERVER)
export default async function ProductsPage() {
  const products = await db.product.findMany(); // ✅ Server fetch

  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// components/client/AddToCart.tsx
'use client';
export function AddToCart({ productId }) {
  return (
    <form action={addToCartAction}>
      <input name="productId" value={productId} readOnly />
      <button>Add to Cart</button>
    </form>
  );
}
````

---

## 📋 TL;DR Rules

### 🔴 CRITICAL: Fix immediately

- NO `'use client'` in `app/layout.tsx` or `app/page.tsx`
- Data fetching → Server components only
- `useEffect` → ALWAYS cleanup + deps
- Secrets → NEVER `NEXT_PUBLIC_`
- Mutations → ALWAYS `revalidatePath()`

### 🟠 HIGH: Fix before production

- NO conditional hooks
- NO objects/functions in deps without memo
- NO browser APIs during SSR

### 🟡 MEDIUM: Fix for polish

- NO N+1 queries (use `.include()`)
- NO over-memoization
- NO over-memoization

```

```
