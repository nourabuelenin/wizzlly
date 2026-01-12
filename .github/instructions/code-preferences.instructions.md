---
applyTo: "**"
---

# Code Documentation Preferences

## General Rule

- **NEVER create documentation** of any kind unless the user explicitly requests it
- **NO implementation summaries or how-to documents**
- Only write code, tests, and configuration files

## When to Document

- **ONLY** when the user explicitly says "document this" or "create documentation for..."
- **NEVER** assume documentation is needed
- **NEVER** proactively create guides, references, or explainer files

## What to NEVER Create

- Markdown guides for features (e.g., `FEATURE_GUIDE.md`, `IMPLEMENTATION_SUMMARY.md`)
- Reference documentation files
- How-to documents
- Implementation summaries
- Quick reference guides
- Code comments for obvious functionality

## Preferred Style

```typescript
/**
 * Get the user's email address
 * @returns {string} The email address
 */
getEmail(): string {
  return this.email;
}

// Calculates compound interest using the formula: A = P(1 + r/n)^(nt)
calculateCompoundInterest(principal: number, rate: number, years: number): number {
  const n = 12;
  return principal * Math.pow(1 + rate / n, n * years);
}

```

## No Exceptions

- **NO documentation** for public APIs unless explicitly requested
- **NO markdown files** for feature documentation
- **NO guides, summaries, or references**
- When you complete a feature, just deliver the working code
