import type { CartItem } from "../types/cart/cart";

const KEY = "cart";
const EVENT = "cartUpdated";

export function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]") as CartItem[];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export function writeCart(items: CartItem[]): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(KEY, JSON.stringify(items));

  window.dispatchEvent(new Event(EVENT));
}

export function clearCart(): void {
  writeCart([]);
}
