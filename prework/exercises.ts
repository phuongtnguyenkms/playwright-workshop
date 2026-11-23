// Pre-work TypeScript exercises.
// Replace each `throw new Error('TODO')` with your implementation, then run:
//   npm run prework
// You need at least 12 of 15 passing, and ALL async exercises (11–15) passing.

import { getProduct, listProductIds, type Product } from './fake-api';

export type CartItem = { name: string; price: number; quantity: number };

// ---------- Part 1: functions, objects and arrays ----------

/** 1. Return the sum of a and b. */
export function add(a: number, b: number): number {
  throw new Error('TODO');
}

/** 2. Return "First Last", e.g. fullName('Jane', 'Doe') → 'Jane Doe'. */
export function fullName(first: string, last: string): string {
  throw new Error('TODO');
}

/** 3. Return true when age is 18 or more. */
export function isAdult(age: number): boolean {
  throw new Error('TODO');
}

/** 4. Format a price with a dollar sign and two decimals: 12.5 → '$12.50'. */
export function formatPrice(price: number): string {
  throw new Error('TODO');
}

/** 5. Turn a product name into a URL slug: 'Claw Hammer' → 'claw-hammer'. */
export function toSlug(name: string): string {
  throw new Error('TODO');
}

/** 6. Total price of the cart: sum of price × quantity, rounded to 2 decimals. */
export function cartTotal(items: CartItem[]): number {
  throw new Error('TODO');
}

/** 7. Return only the items with quantity greater than 0. */
export function nonEmptyItems(items: CartItem[]): CartItem[] {
  throw new Error('TODO');
}

/** 8. Return the name of the cheapest item. Assume the list is not empty. */
export function cheapestName(items: CartItem[]): string {
  throw new Error('TODO');
}

/** 9. Return the item names, sorted A–Z. Do not change the original array. */
export function sortedNames(items: CartItem[]): string[] {
  throw new Error('TODO');
}

/** 10. Count products per category: [{category:'Hammer'}, {category:'Hammer'}] → { Hammer: 2 }. */
export function countByCategory(products: Pick<Product, 'category'>[]): Record<string, number> {
  throw new Error('TODO');
}

// ---------- Part 2: async / await (all must pass) ----------
// getProduct(id) and listProductIds() return Promises. Use await.

/** 11. Return the name of the product with this id. */
export async function productName(id: number): Promise<string> {
  throw new Error('TODO');
}

/** 12. Return true if the product with this id is in stock. */
export async function isInStock(id: number): Promise<boolean> {
  throw new Error('TODO');
}

/** 13. Load all of these products at the same time (hint: Promise.all) and return their names, in order. */
export async function productNames(ids: number[]): Promise<string[]> {
  throw new Error('TODO');
}

/** 14. Return the product name, or 'not found' if getProduct rejects. Use try/catch. */
export async function safeProductName(id: number): Promise<string> {
  throw new Error('TODO');
}

/** 15. Using listProductIds() and getProduct(), return how many products are in stock. */
export async function inStockCount(): Promise<number> {
  throw new Error('TODO');
}
