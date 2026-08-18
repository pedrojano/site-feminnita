"use client";

import { useEffect, useState } from "react";
import { fetchProductStock } from "../../services/productsService";
import type { SkuStock } from "../../types/product/products";

type Props = {
    productId: string;
    selectedSize: string;
    selectedColor?: string;
};

export function StockIndicator({
    productId,
    selectedSize,
    selectedColor,
}: Props) {
    const [skus, setSkus] = useState<SkuStock[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProductStock(productId)
            .then((data) => {
                setSkus(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [productId]);

    if (loading || skus.length === 0) return null;

    const current = skus.find((s) => {
        const sizeMatch = s.size === selectedSize;
        const colorMatch =
            !selectedColor ||
            !s.color ||
            s.color.toLowerCase() === selectedColor.toLowerCase();
        return sizeMatch && colorMatch;
    });

    if (!current && !selectedSize) return null;

    if (current) {
        if (current.stockStatus === "out_of_stock") {
            return (
                <div className="mt-1 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    <span className="text-xs font-medium text-red-600">
                        Esgotado neste tamanho
                    </span>
                </div>
            );
        }
        if (current.stockStatus === "low_stock") {
            return (
                <div className="mt-1 flex items-center gap-1.5">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
                    <span className="text-xs font-medium text-amber-600">
                        Últimas {current.availableQty} unidade
                        {current.availableQty !== 1 ? "s" : ""}!
                    </span>
                </div>
            );
        }
        return (
            <div className="mt-1 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-xs text-green-600">Em estoque</span>
            </div>
        );
    }

    return null;
}
