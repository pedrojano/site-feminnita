"use client";

import { WhatsAppButton } from "../components/common/WhatsAppButton";
import { AuthProvider } from "../hooks/useAuth";
import { CartProvider } from "../hooks/useCart";
import { ColorSwatchesProvider } from "../hooks/useColorSwatches";

export default function ClientBody({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <ColorSwatchesProvider>
                <CartProvider>
                    <div className="antialiased">
                        {children}
                        <WhatsAppButton />
                    </div>
                </CartProvider>
            </ColorSwatchesProvider>
        </AuthProvider>
    );
}
