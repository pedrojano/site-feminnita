import type { StoreProduct } from "../types/product/products";

export function trackViewItemAnalytics(product: StoreProduct): void {
    if (typeof window === "undefined") return;

    if ((window as any).gtag) {
        (window as any).gtag("event", "view_item", {
            currency: "BRL",
            value: product.pixPrice,
            items: [
                {
                    item_id: product.id,
                    item_name: product.name,
                    price: product.pixPrice,
                    quantity: 1,
                },
            ],
        });
    }

    if ((window as any).fbq) {
        (window as any).fbq("track", "ViewContent", {
            content_ids: [product.id],
            content_type: "product",
            value: product.pixPrice,
            currency: "BRL",
        });
    }
}

export function trackAddToCartAnalytics(
    product: StoreProduct,
    quantity: number,
): void {
    if (typeof window === "undefined") return;

    if ((window as any).gtag) {
        (window as any).gtag("event", "add_to_cart", {
            currency: "BRL",
            value: product.pixPrice * quantity,
            items: [
                {
                    item_id: product.id,
                    item_name: product.name,
                    price: product.pixPrice,
                    quantity,
                },
            ],
        });
    }

    if ((window as any).fbq) {
        (window as any).fbq("track", "AddToCart", {
            content_ids: [product.id],
            content_type: "product",
            value: product.pixPrice * quantity,
            currency: "BRL",
        });
    }
}
