---
applyTo: "**"
---

# Next.js 16 Architecture & Best Practices

## 🧩 Core Principle

AI-generated code must leverage Next.js 16's hybrid rendering architecture — using **Server Components by default** for optimal performance, security, and SEO, while strategically using Client Components only for interactivity and browser APIs.

---

## 🎯 Server vs Client Components Decision Tree

```
Need hooks (useState, useEffect)? → YES → 'use client'
Need browser APIs (window, localStorage)? → YES → 'use client'
Need database access? → YES → Server component
Need secrets (API keys)? → YES → Server component
Need interactivity (onClick)? → YES → 'use client'
Static content? → YES → Server component
SEO important? → YES → Server component
→ OTHERWISE → SERVER COMPONENT (DEFAULT)
```

### Server Components (90% of your app)

**✅ Use when:**

- Fetching data (database, APIs)
- Accessing secrets (API keys, DB URLs)
- Static content
- SEO-critical pages
- Forms (server actions)
- Any non-interactive content

**🚀 Benefits:**

- Zero JavaScript bundle
- Direct database access
- Secrets never exposed
- Faster initial load
- Better SEO
- No hydration

```typescript
// ✅ Server component (default)
export default async function ProductsPage() {
  const products = await db.product.findMany({
    include: { category: true },
  });

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Client Components (10% of your app)

⚠️ **Use ONLY when:**

- Need React hooks
- Browser APIs (window, localStorage)
- User interactions (onClick, onChange)
- Real-time updates (WebSocket)
- Third-party client libraries

```typescript
// ✅ Client component (only when needed)
"use client";

export function AddToCartButton({ productId }) {
  const [quantity, setQuantity] = useState(1);

  const addToCart = async () => {
    await addToCartAction(productId, quantity);
  };

  return <button onClick={addToCart}>Add to Cart ({quantity})</button>;
}
```

---

## 📂 Recommended Project Structure

```
app/
├── layout.tsx              # Root layout (SERVER)
├── page.tsx               # Home page (SERVER)
├── products/
│   ├── page.tsx           # Product list (SERVER)
│   ├── loading.tsx        # Loading state
│   └── [id]/
│       └── page.tsx       # Product detail (SERVER)
├── cart/
│   ├── page.tsx           # Cart page (SERVER)
│   └── loading.tsx
└── api/                   # API routes (if needed)
    └── products/
        └── route.ts

components/
├── server/                # Pure server components
│   ├── ProductList.tsx
│   ├── ProductCard.tsx
│   └── Navbar.tsx
└── client/                # Interactive components only
    ├── AddToCartButton.tsx
    ├── ProductFilter.tsx
    └── SearchInput.tsx

lib/
├── db.ts                  # Prisma client
├── actions.ts             # Server actions
├── api.ts                 # API utilities
├── utils.ts               # General utilities
└── types.ts               # TypeScript types

actions/
├── cart.ts                # Cart mutations
├── products.ts            # Product mutations
└── auth.ts                # Auth mutations
```

---

## 🔄 Rendering Strategies

### 1. Static Rendering (Build Time) ⭐ BEST PERFORMANCE

**When:** Content rarely changes  
**Cache:** CDN forever

```typescript
// app/blog/page.tsx
export default async function BlogPage() {
  const posts = await db.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
```

### 2. Dynamic Rendering (Request Time)

**When:** Personalized content (user-specific)  
**Cache:** None (always fresh)

```typescript
// app/dashboard/page.tsx
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const cookieStore = cookies();
  const session = cookieStore.get("session");

  const user = await db.user.findUnique({
    where: { sessionToken: session?.value },
  });

  return <div>Welcome, {user?.name}</div>;
}
```

### 3. ISR: Incremental Static Regeneration ⭐ BEST OF BOTH

**When:** Updates occasionally (hourly/daily)  
**Cache:** Time-based + on-demand

```typescript
// app/products/page.tsx
export const revalidate = 3600; // 1 hour

export default async function ProductsPage() {
  const products = await fetch("https://api.example.com/products", {
    next: { revalidate: 3600 },
  }).then((res) => res.json());

  return <ProductList products={products} />;
}
```

### 4. Streaming with Suspense ⭐ PROGRESSIVE LOADING

```typescript
// app/dashboard/page.tsx
import { Suspense } from "react";

export default function Dashboard() {
  return (
    <div>
      {/* Immediate */}
      <h1>Dashboard</h1>

      {/* Streams separately */}
      <Suspense fallback={<StatsSkeleton />}>
        <ProductStats />
      </Suspense>

      <Suspense fallback={<ChartSkeleton />}>
        <SalesChart />
      </Suspense>
    </div>
  );
}
```

### 5. Partial Pre-Rendering (PPR) ⭐ NEW IN NEXT 16

Static shell + dynamic holes

```typescript
// Static shell + dynamic user data
export default function Page() {
  return (
    <div>
      {/* Static: Build time */}
      <Header />
      <Navigation />

      {/* Dynamic: Streams per request */}
      <Suspense fallback={<UserSkeleton />}>
        <UserProfile />
      </Suspense>
    </div>
  );
}
```

---

## 🔗 Data Fetching Patterns

### Pattern 1: Server Component + Database ⭐ DIRECT & FAST

```typescript
// app/products/page.tsx
export default async function Page() {
  // ✅ Direct DB access, fastest
  const products = await db.product.findMany({
    where: { inStock: true },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return <ProductsList products={products} />;
}
```

### Pattern 2: Server Component + External API

```typescript
// app/stocks/page.tsx
export const revalidate = 60; // 1 minute

async function getStocks() {
  const res = await fetch("https://api.stocks.com/latest", {
    headers: {
      Authorization: `Bearer ${process.env.STOCKS_API_KEY}`, // ✅ Safe on server
    },
    next: { revalidate: 60 },
  });
  return res.json();
}

export default async function StocksPage() {
  const stocks = await getStocks();
  return <StocksTable data={stocks} />;
}
```

### Pattern 3: Server Actions (Mutations) ⭐ RECOMMENDED

```typescript
// lib/actions/products.ts
"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));

  const product = await db.product.create({
    data: { name, price },
  });

  // ✅ Revalidate affected pages
  revalidatePath("/products");
  revalidateTag("products");

  return { success: true, product };
}

export async function deleteProduct(id: string) {
  await db.product.delete({ where: { id } });
  revalidatePath("/products");
  return { success: true };
}
```

**Usage:**

```typescript
// Client component
"use client";
import { useActionState } from "react";

export function AddProductForm() {
  const [state, addProduct, pending] = useActionState(createProduct, null);

  return (
    <form action={addProduct}>
      <input name="name" />
      <input name="price" type="number" />
      <button disabled={pending}>Add Product</button>
    </form>
  );
}
```

### Pattern 4: Client-Side Real-Time (Exception)

```typescript
// ✅ ONLY for real-time
"use client";

export function LiveNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("wss://api.example.com/notifications");

    socket.addEventListener("message", (event) => {
      const notif = JSON.parse(event.data);
      setNotifications((prev) => [notif, ...prev.slice(0, 9)]);
    });

    return () => socket.close();
  }, []);

  return (
    <div>
      {notifications.map((n) => (
        <div key={n.id}>{n.message}</div>
      ))}
    </div>
  );
}
```

---

## 💾 Caching & Revalidation

### Cache Control Options

```typescript
// 1. Static (default)
export default async function StaticPage() {
  const data = await db.post.findMany(); // Cached forever
  return <div>{data}</div>;
}

// 2. ISR (time-based)
export const revalidate = 300; // 5 minutes

// 3. On-demand revalidation
("use server");
revalidatePath("/products"); // Specific path
revalidateTag("products"); // All with tag

// 4. Force dynamic (no cache)
export const dynamic = "force-dynamic";

// 5. Fetch cache control
const data = await fetch(url, {
  next: {
    revalidate: 60, // Time-based
    tags: ["products"], // Tag-based
  },
});
```

### ✅ Revalidation After Mutations

```typescript
"use server";

export async function updateProduct(id: string, data: any) {
  const product = await db.product.update({
    where: { id },
    data,
  });

  // ✅ Revalidate ALL affected pages
  revalidatePath("/products"); // List page
  revalidatePath(`/products/${id}`); // Detail page
  revalidatePath("/cart"); // Cart page
  revalidateTag("products"); // All product pages
  revalidateTag("inventory"); // Inventory pages

  return product;
}
```

---

## 🔐 Environment Variables

### ✅ Server-Only (Secrets)

```bash
# .env.local (NEVER commit)
DATABASE_URL="postgresql://..."
STRIPE_SECRET="sk_live_..."
API_SECRET_KEY="sk_live_..."
```

### ✅ Client-Safe (Public)

```bash
# .env.local (can commit URLs)
NEXT_PUBLIC_API_URL="https://api.example.com"
NEXT_PUBLIC_APP_NAME="MyApp"
```

### ✅ Usage Examples

```typescript
// ✅ Server component - secrets safe
export default async function Page() {
  const stripe = new Stripe(process.env.STRIPE_SECRET!); // ✅ Safe
  const apiKey = process.env.API_SECRET_KEY; // ✅ Safe
}

// ✅ Client component - only public vars
("use client");
const apiUrl = process.env.NEXT_PUBLIC_API_URL; // ✅ Safe
// process.env.STRIPE_SECRET → undefined (GOOD!)
```

---

## 🛠️ TypeScript Standards

```typescript
// lib/types.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ProductPageProps {
  products: Product[];
  categories: string[];
}

// ✅ Usage with proper typing
interface ProductListProps {
  products: Product[];
  onAddToCart: (productId: string, quantity: number) => Promise<void>;
}

export default function ProductList({
  products,
  onAddToCart,
}: ProductListProps) {
  return (
    <div>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
```

---

## ✅ Architecture Checklist

Before merging code:

- [ ] Server components by default (no unnecessary `'use client'`)
- [ ] Database queries on server (no client-side Prisma)
- [ ] Secrets never in `NEXT_PUBLIC_`
- [ ] Mutations use server actions (not client fetch)
- [ ] Cache revalidated after mutations
- [ ] Images use `next/image`
- [ ] Fonts use `next/font`
- [ ] Suspense boundaries for slow components
- [ ] TypeScript types for all props
- [ ] No hydration warnings
- [ ] Bundle size reasonable (`npm run build`)

## 📊 Quick Reference

| Feature       | Server Component | Client Component     |
| ------------- | ---------------- | -------------------- |
| Default       | ✅ YES           | ❌ No                |
| Database      | ✅ Direct        | ❌ No                |
| Secrets       | ✅ Safe          | ❌ Exposed           |
| Hooks         | ❌ No            | ✅ Yes               |
| JS Bundle     | 0 KB             | Adds to bundle       |
| SEO           | ✅ Perfect       | ❌ JavaScript needed |
| Interactivity | ❌ No            | ✅ Yes               |
| Cache         | ✅ Full control  | ❌ No                |

**Rule:** 90% Server Components, 10% Client Components

---

## 🎓 Complete Architecture Example

```typescript
// app/products/page.tsx (SERVER)
import { Suspense } from "react";
import { ProductList } from "@/components/server/ProductList";
import { ProductFilter } from "@/components/client/ProductFilter";

export const revalidate = 300; // 5 minutes

export default async function ProductsPage() {
  const products = await db.product.findMany({
    where: { inStock: true },
    include: { category: true },
  });

  return (
    <div>
      <h1>Products ({products.length})</h1>

      {/* Client-only interactivity */}
      <Suspense fallback={<div>Loading filters...</div>}>
        <ProductFilter />
      </Suspense>

      {/* Server-rendered list */}
      <ProductList products={products} />
    </div>
  );
}

// lib/actions/cart.ts (SERVER ACTION)
("use server");
export async function addToCart(formData: FormData) {
  const productId = formData.get("productId") as string;
  const quantity = Number(formData.get("quantity"));

  // Add to user's cart
  const cartItem = await db.cartItem.upsert({
    where: { productId_userId: { productId, userId: getUserId() } },
    update: { quantity: { increment: quantity } },
    create: { productId, userId: getUserId(), quantity },
  });

  revalidatePath("/cart");
  revalidatePath("/products");

  return { success: true, cartItem };
}
```
