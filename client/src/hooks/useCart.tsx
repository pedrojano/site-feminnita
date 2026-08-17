"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
    addItem,
    cartCount,
    cartSubTotal,
    removeAt,
    setQuantityAt,
} from "../utils/cart";
import { readCart, writeCart } from "../services/cartService";
import type { CartItem } from "../types/cart/cart";

type CartValue = {
    items: CartItem[];
    count: number;
    subtotal: number;
    add: (item: CartItem) => void;
    remove: (index: number) => void;
    setQuantity: (index: number, quantity: number) => void;
    clear: () => void;
    ready: boolean;
};

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setItems(readCart());
        setReady(true);

        const onCartUpdate = () => setItems(readCart());
        window.addEventListener("cartUpdated", onCartUpdate);
        window.addEventListener("storage", onCartUpdate);

        return () => {
            window.removeEventListener("cartUpdated", onCartUpdate);
            window.removeEventListener("storage", onCartUpdate);
        };
    }, []);

    const persist = (next: CartItem[]) => {
        setItems(next);
        writeCart(next);
    };

    const value: CartValue = {
        items,
        ready,
        count: cartCount(items),
        subtotal: cartSubTotal(items),
        add: (item) => persist(addItem(items, item)),
        remove: (index) => persist(removeAt(items, index)),
        setQuantity: (index, quantity) => persist(setQuantityAt(items, index, quantity)),
        clear: () => persist([]),
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartValue {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart precisa estar dentro de <CartProvider>");
    return ctx;
}
