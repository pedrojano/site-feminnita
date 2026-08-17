"use client";

import { Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../../hooks/useCart";

const NAV_LINKS = [
  { href: "/produtos", label: "PRODUTOS" },
  { href: "/lancamentos", label: "LANÇAMENTOS" },
  { href: "/mais-vendidos", label: "MAIS VENDIDOS" },
  { href: "/promocao", label: "PROMOÇÃO" },
];

export function Header() {
  const { count: cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="bg-gray-100 py-2 text-center text-sm">
        3X SEM JUROS nos cartões de crédito
      </div>
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="relative flex items-center justify-between gap-3">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="-m-2 p-2 text-gray-700 hover:text-gray-900 lg:hidden"
              aria-label="Abrir menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link
              href="/"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:static lg:translate-x-0 lg:translate-y-0"
            >
              <h1 className="text-xl font-light tracking-wider text-[#8C2F39] sm:text-2xl">
                Feminnita
              </h1>
            </Link>

            <nav className="hidden gap-6 text-sm font-medium lg:flex lg:items-center">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center justify-end gap-2 sm:gap-4">
            <Link href="/busca" className="-m-2 p-2.5 hover:text-gray-600">
              <Search size={20} />
            </Link>
            <Link
              href="/minha-conta"
              className="-m-2 hidden p-2.5 hover:text-gray-600 sm:block"
            >
              <User size={20} />
            </Link>
            <Link
              href="/favoritos"
              className="relative -m-2 hidden p-2.5 hover:text-gray-600 sm:block"
            >
              <Heart size={20} />
            </Link>
            <Link
              href="/carrinho"
              className="relative -m-2 p-2.5 hover:text-gray-600"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {menuOpen && (
          <nav className="mt-4 flex flex-col gap-1 border-t pt-4 lg:hidden">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-2 text-sm font-medium text-gray-700 hover:text-[#8C2F39]"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-1 flex gap-1 border-t pt-3 sm:hidden">
              <Link
                href="/minha-conta"
                onClick={() => setMenuOpen(false)}
                className="flex flex-1 items-center gap-2 rounded-lg py-2 text-sm font-medium text-gray-700 hover:text-[#8C2F39]"
              >
                <User size={18} />
                Minha conta
              </Link>
              <Link
                href="/favoritos"
                onClick={() => setMenuOpen(false)}
                className="flex flex-1 items-center gap-2 rounded-lg py-2 text-sm font-medium text-gray-700 hover:text-[#8C2F39]"
              >
                <Heart size={18} />
                Favoritos
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
