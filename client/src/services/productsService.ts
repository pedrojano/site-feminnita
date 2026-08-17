import { apiGet } from "./api";
import type { StoreProduct } from "../types/product/products";

export async function fetchProducts(options?: {
    featured?: boolean;
    category_slug?: string;
    limit?: number;
}): Promise<StoreProduct[]> {
    const params = new URLSearchParams();
    if (options?.featured) params.set("featured", "true");
    if (options?.category_slug) params.set("category", options.category_slug);
    if (options?.limit) params.set("limit", String(options.limit));

    return (await apiGet<StoreProduct[]>(`/api/store/products?${params}`)) ?? [];
}

export async function fetchProduct(idOrSlug: string): Promise<StoreProduct | null> {
    return apiGet<StoreProduct>(`/api/store/products/${idOrSlug}`);
}