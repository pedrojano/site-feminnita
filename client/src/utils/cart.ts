import type { CartItem } from "../types/cart/cart";

function sameVariant(a: CartItem, b: CartItem): boolean {
    return (
        a.id === b.id &&
        a.selectedColor === b.selectedColor &&
        a.selectedSize === b.selectedSize
    );
}

export function addItem(items: CartItem[], newItem: CartItem): CartItem[] {
    const idx = items.findIndex((item) => sameVariant(item, newItem));

    if (idx === -1) return [...items, newItem];
    return items.map((item, p) =>
        p === idx ? { ...item, quantity: item.quantity + newItem.quantity } : item,
    );
}

export function removeAt(items: CartItem[], index: number): CartItem[] {
    return items.filter((_, item) => item !== index);
}

export function setQuantityAt(
    items: CartItem[],
    index: number,
    quantity: number,
): CartItem[] {
    if (quantity < 1) return items;
    return items.map((item, p) => (p === index ? { ...item, quantity } : item));
}

export function cartCount(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function cartSubTotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function mergeCarts(base: CartItem[], incoming: CartItem[]): CartItem[] {
    return incoming.reduce((acc, item) => addItem(acc, item), base);
}
