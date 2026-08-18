"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import type { ColorSelectorProps } from "../../types/product/products";

export function ColorSelector({
    colors,
    selectedColor,
    onSelect,
    swatches,
}: ColorSelectorProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    if (colors.length === 0) return null;

    const scrollColors = (dir: number) => {
        scrollRef.current?.scrollBy({ left: dir * 60, behavior: "smooth" });
    };

    return (
        <div className="flex flex-col items-center text-center">
            <label className="mb-3 block text-sm font-medium">
                Cor: <span className="font-normal text-gray-600">{selectedColor}</span>
            </label>
            <div className="flex items-center gap-1">
                <button
                    type="button"
                    onClick={() => scrollColors(-1)}
                    className="shrink-0 rounded-full p-0.5 text-gray-400 hover:text-gray-700 md:hidden"
                    aria-label="Cores anteriores"
                >
                    <ChevronLeft size={18} />
                </button>
                <div
                    ref={scrollRef}
                    className="flex max-w-[268px] gap-3 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:max-w-none [&::-webkit-scrollbar]:hidden"
                >
                    {colors.map((color) => {
                        const swatch = swatches.find(
                            (s) => s.name.toLowerCase() === color.toLowerCase(),
                        );

                        return (
                            <button
                                key={color}
                                onClick={() => onSelect(color)}
                                className={`h-11 w-11 flex-shrink-0 overflow-hidden rounded-full border-2 transition-all ${selectedColor === color
                                        ? "scale-110 border-black ring-2 ring-black ring-offset-2"
                                        : "border-gray-300 hover:border-gray-400"
                                    }`}
                                title={color}
                            >
                                {swatch?.imageUrl ? (
                                    <img
                                        src={swatch.imageUrl}
                                        alt={color}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="flex h-full w-full items-center justify-center bg-gray-200 text-[8px] text-gray-500">
                                        ?
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
                <button
                    type="button"
                    onClick={() => scrollColors(1)}
                    className="shrink-0 rounded-full p-0.5 text-gray-400 hover:text-gray-700 md:hidden"
                    aria-label="Próximas cores"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
}
