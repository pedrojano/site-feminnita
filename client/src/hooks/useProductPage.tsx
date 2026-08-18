"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "../hooks/useCart";
import { useColorSwatches } from "../hooks/useColorSwatches";
import { fetchProduct, trackProductView } from "../services/productsService";
import {
    trackAddToCartAnalytics,
    trackViewItemAnalytics,
} from "../utils/analytics";
import { buildCartItem, getDisplayImages } from "../utils/product";
import type { StoreProduct } from "../types/product/products";

export function useProductPage() {
    const params = useParams();
    const cart = useCart();
    const swatches = useColorSwatches();

    const [product, setProduct] = useState<StoreProduct | null>(null);
    const [loadingProduct, setLoadingProduct] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [showVideo, setShowVideo] = useState(false);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);
    const [toast, setToast] = useState("");
    const [stickyVisible, setStickyVisible] = useState(false);
    const mainCTARef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const idOrSlug = Array.isArray(params.id) ? params.id[0] : params.id;
        if (!idOrSlug) return;
        setLoadingProduct(true);
        fetchProduct(idOrSlug).then((p) => {
            setProduct(p);
            setLoadingProduct(false);
        });
    }, [params.id]);

    useEffect(() => {
        if (!mainCTARef.current) return;
        const obs = new IntersectionObserver(
            ([entry]) => setStickyVisible(!entry.isIntersecting),
            { threshold: 0 },
        );
        obs.observe(mainCTARef.current);
        return () => obs.disconnect();
    }, [product]);

    useEffect(() => {
        if (!product) return;
        setSelectedColor(product.colors[0] || "");
        trackProductView(product.id);
        trackViewItemAnalytics(product);
    }, [product]);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(""), 2800);
    };

    const selectColor = (color: string) => {
        setSelectedColor(color);
        setSelectedImage(0);
    };

    const selectImage = (index: number) => {
        setShowVideo(false);
        setSelectedImage(index);
    };

    const handleAddToCart = () => {
        if (!product) return;
        if (!selectedSize) {
            showToast("Selecione um tamanho");
            return;
        }

        cart.add(buildCartItem({ product, selectedSize, selectedColor, quantity }));
        trackAddToCartAnalytics(product, quantity);
        showToast(`${quantity}x adicionado ao carrinho!`);
    };

    const displayImages = product ? getDisplayImages(product, selectedColor) : [];

    return {
        product,
        loadingProduct,
        swatches,
        selectedImage,
        showVideo,
        setShowVideo,
        selectImage,
        selectedColor,
        selectColor,
        selectedSize,
        setSelectedSize,
        quantity,
        setQuantity,
        isFavorite,
        setIsFavorite,
        toast,
        stickyVisible,
        mainCTARef,
        displayImages,
        handleAddToCart,
    };
}
