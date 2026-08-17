export type CartItem = {
    id: string;
    name: string;
    images: string[];
    price: number;
    pixPrice: number;
    quantity: number;
    selectedColor: string;
    selectedSize: string;
    category?: string;
};
