---
applyTo: "**"
---

# Next.js 16 Lifecycle Instructions

## 🧩 Core Principle

AI-generated code must strictly follow React 19's component lifecycle patterns and Next.js 16's rendering model — ensuring predictable behavior, proper cleanup, and correct hook usage.

---

## 📋 Server Components Lifecycle

### Characteristics

- Render **ONCE** per request (or cached)
- **NO hooks** allowed
- **NO browser APIs**
- **NO state management**
- Direct database access **safe**
- Secrets **stay safe**
- **Zero JavaScript** overhead

### Lifecycle

```
Request → Render on Server → Stream HTML → Done
```

### ✅ Can Do

- ✅ Fetch from database (Prisma, SQL, etc.)
- ✅ Access secrets (API keys)
- ✅ Async/await for data
- ✅ Complex computations

### ❌ Cannot Do

- ❌ `useState`, `useEffect`, `useCallback`
- ❌ `window`, `localStorage`
- ❌ `'use client'`
- ❌ Interactivity

### Example

```typescript
// ✅ CORRECT: Server component
export default async function Page() {
  const products = await db.product.findMany();
  return (
    <div>
      {products.map((p) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
}

// ❌ WRONG: Using hooks in server component
export default function Page() {
  const [state, setState] = useState(null); // ERROR!
}
```

---

## 🔵 Client Components Lifecycle

### When Created

- Marked with `'use client'` directive
- Only for interactivity or browser APIs
- Hydrated on browser

### 4 Phases

#### 1. Initialization (First Render)

- Component function executes
- State initialized
- Refs created
- No DOM access yet
- Props received

#### 2. Mount (First DOM insertion)

- Component added to DOM
- `useEffect([])` runs
- Initial setup complete
- Best for: API calls, subscriptions

#### 3. Update (Props/State change)

- Component re-renders
- `useEffect([deps])` runs
- Previous cleanup runs first

#### 4. Unmount (Component removed)

- All cleanup functions run
- Resources freed
- Memory cleaned

### Lifecycle Visualization

```
Initialize → Mount → Update → Unmount
              ↓        ↓
         useEffect  useEffect
         cleanup    cleanup
```

---

## ⚡ React 19 Hooks by Lifecycle Phase

## ⚡ React 19 Hooks by Lifecycle Phase

### Mount Only: `useEffect(() => { ... }, [])`

Runs **ONCE** when component mounts.

```typescript
"use client";

export function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // ✅ Runs once on mount
  useEffect(() => {
    fetch(`/api/user/${userId}`)
      .then((r) => r.json())
      .then(setUser);
  }, []); // Empty array = mount only

  return <div>{user?.name}</div>;
}
```

**Use for:**

- Initial API call
- Setup subscriptions
- Initialize libraries
- Start timers

⚠️ **Problem:** Won't update if `userId` changes

### Update on Change: `useEffect(() => { ... }, [dependencies])`

Runs when dependencies change.

```typescript
"use client";

export function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // ✅ Runs when userId changes
  useEffect(() => {
    fetch(`/api/user/${userId}`)
      .then((r) => r.json())
      .then(setUser);
  }, [userId]); // ✅ Dependency included

  return <div>{user?.name}</div>;
}
```

**Use for:**

- Respond to prop changes
- Refetch when query changes
- Update based on state

### Cleanup: `return () => { ... }`

**ALWAYS** cleanup subscriptions/timers/listeners.

```typescript
"use client";

export function ChatWindow({ roomId }) {
  useEffect(() => {
    // Setup
    const socket = new WebSocket(`wss://api.example.com/chat/${roomId}`);
    const handleMessage = (event) => {
      console.log("Message:", event.data);
    };
    socket.addEventListener("message", handleMessage);

    // ✅ Cleanup runs on unmount OR roomId change
    return () => {
      socket.removeEventListener("message", handleMessage);
      socket.close();
    };
  }, [roomId]);
}
```

**Always cleanup:**

- ✅ Event listeners: `removeEventListener()`
- ✅ Timers: `clearInterval()`, `clearTimeout()`
- ✅ WebSockets: `close()`
- ✅ Fetch: `AbortController`
- ✅ Subscriptions: `unsubscribe()`

### ❌ NEVER: `useEffect(() => { ... })` (No deps)

Runs after **EVERY** render - usually a mistake.

```typescript
// ❌ WRONG: Runs every render
useEffect(() => {
  console.log("Spam!"); // Logs every keystroke
  fetch("/api/data"); // API call every render!
});

// ✅ CORRECT: Be specific
useEffect(() => {
  fetch("/api/data");
}, []); // Once on mount
```

---

## 🎯 React 19 New Hooks

## 🎯 React 19 New Hooks

### useActionState: Form Submissions

Manages loading/error state automatically.

**Server action:**

```typescript
"use server";
export async function updateProfile(prevState, formData) {
  try {
    const name = formData.get("name");
    const user = await db.user.update({ data: { name } });
    revalidatePath("/profile");
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

**Client component:**

```typescript
"use client";
import { useActionState } from "react";

export function ProfileForm() {
  const [state, formAction, isPending] = useActionState(updateProfile, null);

  return (
    <form action={formAction}>
      <input name="name" />
      <button disabled={isPending}>{isPending ? "Saving..." : "Save"}</button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}
```

### useOptimistic: Instant UI Feedback

Update UI before server confirms.

```typescript
"use client";
import { useOptimistic } from "react";

export function TodoList({ todos }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, { ...newTodo, pending: true }]
  );

  const addTodo = async (formData) => {
    const text = formData.get("text");

    // ✅ UI updates instantly
    addOptimisticTodo({ id: Date.now(), text });

    // ✅ Server confirms
    await createTodoAction(formData);
  };

  return (
    <>
      <form action={addTodo}>
        <input name="text" />
        <button>Add</button>
      </form>
      {optimisticTodos.map((todo) => (
        <div key={todo.id} className={todo.pending ? "pending" : ""}>
          {todo.text}
        </div>
      ))}
    </>
  );
}
```

---

## 🚀 Performance Hooks

### useMemo: Cache Expensive Computations

```typescript
"use client";
import { useMemo } from "react";

export function UserList({ users, filter }) {
  // ✅ Only recompute when users or filter change
  const filteredUsers = useMemo(() => {
    console.log("Filtering..."); // Logs only on deps change
    return users.filter((u) => u.name.includes(filter));
  }, [users, filter]);

  return (
    <ul>
      {filteredUsers.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
```

### useCallback: Stable Function References

```typescript
"use client";
import { useCallback, memo } from "react";

export function Parent({ userId }) {
  // ✅ Stable reference unless userId changes
  const handleSelect = useCallback(
    (id) => {
      console.log(`Selected ${id} for user ${userId}`);
    },
    [userId]
  );

  return <MemoChild onSelect={handleSelect} />;
}

const MemoChild = memo(({ onSelect }) => (
  <button onClick={() => onSelect("item1")}>Select</button>
));
```

---

## ❌ Critical Anti-Patterns

### 1. Missing Cleanup (Memory Leaks)

```typescript
// ❌ WRONG
useEffect(() => {
  window.addEventListener("resize", handler);
  // Never cleaned up!
}, []);

// ✅ CORRECT
useEffect(() => {
  const handler = () => console.log("resize");
  window.addEventListener("resize", handler);
  return () => window.removeEventListener("resize", handler);
}, []);
```

### 2. Missing Dependencies (Stale Closures)

```typescript
// ❌ WRONG
useEffect(() => {
  fetch(`/api/user/${userId}`); // userId not in deps!
}, []);

// ✅ CORRECT
useEffect(() => {
  fetch(`/api/user/${userId}`);
}, [userId]);
```

### 3. Conditional Hooks (Breaks Rules)

```typescript
// ❌ WRONG
if (condition) {
  useState(0); // Hook order changes!
}

// ✅ CORRECT
const [state, setState] = useState(0);
if (condition) {
  // Use state
}
```

---

## 🎓 Complete Example: Product Card

```typescript
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
}

export function ProductCard({ product }: { product: Product }) {
  const [localRating, setLocalRating] = useState(product.rating);
  const [isUpdating, setIsUpdating] = useState(false);

  // MOUNT: Setup analytics
  useEffect(() => {
    // Track view
    analytics.track('product_view', { productId: product.id });

    return () => {
      // Cleanup: Track unview
      analytics.track('product_unview', { productId: product.id });
    };
  }, [product.id]);

  // UPDATE: Sync with prop changes
  useEffect(() => {
    setLocalRating(product.rating);
  }, [product.rating]);

  // MEMOIZED: Stable callback
  const updateRating = useCallback(async (newRating: number) => {
    setIsUpdating(true);

    try {
      await fetch(`/api/products/${product.id}/rating`, {
        method: 'POST',
        body: JSON.stringify({ rating: newRating }),
      });
    } finally {
      setIsUpdating(false);
    }
  }, [product.id]);

  // MEMOIZED: Expensive computation
  const discountPrice = useMemo(() => {
    return product.price * 0.9; // 10% discount
  }, [product.price]);

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Original: ${product.price}</p>
      <p>Discount: ${discountPrice}</p>

      <input
        type="range"
        min="1"
        max="5"
        value={localRating}
        onChange={(e) => setLocalRating(Number(e.target.value))}
        disabled={isUpdating}
      />

      <button
        onClick={() => updateRating(localRating)}
        disabled={isUpdating}
      >
        {isUpdating ? 'Updating...' : 'Save Rating'}
      </button>
    </div>
  );
}
📊 Quick Reference Table

| Hook | Purpose | Dependencies | Cleanup | Example |
|------|---------|--------------|---------|---------|
| `useState` | State | None | No | `useState(0)` |
| `useEffect([])` | Mount only | Empty array | Yes | Initial API call |
| `useEffect([dep])` | Updates | List deps | Yes | Refetch on change |
| `useMemo` | Cache value | List deps | No | Expensive filter |
| `useCallback` | Stable fn | List deps | No | Pass to children |
| `useActionState` | Forms | None | No | Server mutations |
| `useOptimistic` | Instant UI | None | No | Pre-server update |

---

## ✅ Final Rules (ALWAYS FOLLOW)

- ✅ Server components by default - no `'use client'` unless needed
- ✅ List ALL dependencies in `useEffect`, `useMemo`, `useCallback`
- ✅ ALWAYS cleanup listeners, timers, subscriptions, WebSockets
- ✅ NEVER use hooks conditionally or in loops
- ✅ Use server actions for mutations, not client fetch
- ✅ `useMemo`/`useCallback` only for expensive operations
```
