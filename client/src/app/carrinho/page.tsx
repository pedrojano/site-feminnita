"use client";

import { useCart } from "@/src/hooks/useCart";
import { isSelected } from "@/src/utils/cart";
import { ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/src/components/layout/Header";

export default function CartPage() {
    const {
        items,
        remove,
        setQuantity,
        toggleSelected,
        setAllSelected,
        selectedCount,
        selectedSubtotal,
    } = useCart();

    const allSelected = items.length > 0 && items.every(isSelected);
    const shipping = selectedSubtotal >= 299 || selectedCount === 0 ? 0 : 15;
    const total = selectedSubtotal + shipping;

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <header className="border-b bg-white py-4">
                    <div className="container mx-auto px-4">
                        <Header />
                    </div>
                </header>

                <div className="container mx-auto px-4 py-16">
                    <div className="mx-auto max-w-2xl space-y-6 text-center">
                        <ShoppingBag size={64} className="mx-auto text-gray-300" />
                        <h1 className="text-3xl font-light">Seu carrinho está vazio</h1>
                        <Link
                            href="/"
                            className="inline-block rounded-lg bg-black px-8 py-3 text-white hover:bg-gray-800"
                        >
                            Continuar Comprando
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="border-b bg-white py-4">
                <div className="container mx-auto px-4">
                    <Header />
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <h1 className="mb-8 text-3xl font-light">Meu Carrinho de Compras</h1>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Cart Items */}
                    <div className="space-y-4 lg:col-span-2">
                        <label className="flex cursor-pointer items-center gap-3 rounded-lg border bg-white px-4 py-3">
                            <input
                                type="checkbox"
                                checked={allSelected}
                                onChange={(e) => setAllSelected(e.target.checked)}
                                className="h-5 w-5 accent-[#8C2F39]"
                            />
                            <span className="text-sm font-medium">
                                Selecionar todos os itens
                            </span>
                        </label>

                        {items.map((item, index) => (
                            <div
                                key={`${item.id}-${item.selectedColor}-${index}`}
                                className={`flex flex-col gap-4 rounded-lg border bg-white p-4 transition-opacity sm:flex-row ${isSelected(item) ? "" : "opacity-50"
                                    }`}
                            >
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={isSelected(item)}
                                        onChange={() => toggleSelected(index)}
                                        className="h-5 w-5 accent-[#8C2F39]"
                                        aria-label={`Selecionar ${item.name}`}
                                    />
                                </div>

                                <div className="relative mx-auto h-32 w-24 flex-shrink-0 overflow-hidden rounded bg-gray-100 sm:mx-0">
                                    <Image
                                        src={item.images?.[0] || "/placeholder.png"}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="flex-1 space-y-2">
                                    <h3 className="font-medium">{item.name}</h3>
                                    <p className="text-sm text-gray-600">
                                        Cor: {item.selectedColor}
                                    </p>
                                    <p className="font-semibold">
                                        R$ {item.price.toFixed(2).replace(".", ",")}
                                    </p>
                                </div>

                                <div className="flex flex-row items-center justify-between sm:flex-col sm:items-end sm:justify-between">
                                    <button
                                        onClick={() => remove(index)}
                                        className="text-gray-400 hover:text-red-500"
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setQuantity(index, item.quantity - 1)}
                                            className="h-8 w-8 rounded border hover:bg-gray-100"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => setQuantity(index, item.quantity + 1)}
                                            className="h-8 w-8 rounded border hover:bg-gray-100"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <p className="font-semibold">
                                        R${" "}
                                        {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-4 space-y-4 rounded-lg border bg-white p-6">
                            <h2 className="text-xl font-medium">Resumo do Pedido</h2>

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>
                                        Subtotal ({selectedCount}{" "}
                                        {selectedCount === 1 ? "item" : "itens"})
                                    </span>
                                    <span>R$ {selectedSubtotal.toFixed(2).replace(".", ",")}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Frete</span>
                                    <span>
                                        {shipping === 0
                                            ? "Grátis"
                                            : `R$ ${shipping.toFixed(2).replace(".", ",")}`}
                                    </span>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between text-lg font-semibold">
                                    <span>Total</span>
                                    <span>R$ {total.toFixed(2).replace(".", ",")}</span>
                                </div>
                                <p className="mt-1 text-xs text-gray-500">no PIX (5% OFF)</p>
                            </div>

                            {selectedCount === 0 ? (
                                <button
                                    disabled
                                    className="w-full cursor-not-allowed rounded-lg bg-gray-300 py-3 text-white"
                                >
                                    Selecione ao menos um item
                                </button>
                            ) : (
                                <Link href="/checkout">
                                    <button className="w-full rounded-lg bg-black py-3 text-white hover:bg-gray-800">
                                        Finalizar Compra
                                    </button>
                                </Link>
                            )}

                            <Link href="/">
                                <button className="mt-3 w-full rounded-lg border py-3 hover:bg-gray-50">
                                    Continuar Comprando
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
