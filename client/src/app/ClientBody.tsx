"use client";

import { WhatsAppButton } from "../components/common/WhatsAppButton";
import { CartProvider } from "../hooks/useCart";
import { ColorSwatchesProvider } from "../hooks/useColorSwatches";

export default function ClientBody({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ColorSwatchesProvider>
            <CartProvider>
                <div className="antialiased">
                    {children}
                    <WhatsAppButton />
                </div>
            </CartProvider>
        </ColorSwatchesProvider>
    );
}
