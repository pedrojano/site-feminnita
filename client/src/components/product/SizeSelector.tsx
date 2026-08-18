"use client";

import { StockIndicator } from "../product/StockIndicador";
import type { SizeSelectorProps } from "../../types/product/products";

export function SizeSelector({
    productId,
    sizes,
    selectedSize,
    selectedColor,
    onSelect,
}: SizeSelectorProps) {
    return (
        <div>
            <label className="mb-3 block text-sm font-medium">
                Tamanho:{" "}
                {selectedSize && (
                    <span className="font-normal text-gray-600">{selectedSize}</span>
                )}
            </label>
            <div className="mb-3 flex flex-wrap gap-3">
                {sizes.map((size) => (
                    <button
                        key={size}
                        onClick={() => onSelect(size)}
                        className={`rounded-lg border-2 px-6 py-3 font-medium transition-all ${selectedSize === size
                            ? "border-black bg-black text-white"
                            : "border-gray-300 hover:border-gray-400"
                            }`}
                    >
                        {size}
                    </button>
                ))}
            </div>
            <StockIndicator
                productId={productId}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
            />
        </div>
    );
}
