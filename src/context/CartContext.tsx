"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

export type CartItem = {
    id: string; // product id (or slug? let's stick to id + slug for navigation)
    slug: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
};

type CartContextType = {
    items: CartItem[];
    addToCart: (product: Omit<CartItem, "quantity">) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, delta: number) => void; // delta can be +1 or -1
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load from LocalStorage on mount with Migration Logic
    useEffect(() => {
        const stored = localStorage.getItem("joy-juncture-cart");
        if (stored) {
            try {
                const parsedItems: CartItem[] = JSON.parse(stored);

                // MIGRATION: Fix old image paths (e.g., from /games/ to /products/)
                // Ensure users with old cart data see the new images
                const migratedItems = parsedItems.map(item => {
                    if (item.image?.includes("/games/")) {
                        // Map slug to new verified image path
                        const MIGRATION_MAP: Record<string, string> = {
                            "dead-mans-deck": "/products/dead-mans-deck.jpg",
                            "mehfil": "/products/mehfil.png",
                            "tamasha": "/products/tamasha.jpeg",
                            "the-bloody-inheritance": "/products/bloody-inheritance.jpeg",
                            "court52": "/products/court52.png",
                            "buzzed": "/products/buzzed.jpeg",
                            "judge-me-and-guess": "/products/judge-me-and-guess.png",
                            "one-more-round": "/products/one-more-round.png",
                            "dreamers-fair": "/products/dreamers-fair.png",
                            "she-dare-mayhem-bachelorette-edition": "/products/she-dare-mayhem.png"
                        };

                        if (MIGRATION_MAP[item.slug]) {
                            return { ...item, image: MIGRATION_MAP[item.slug] };
                        }
                    }
                    return item;
                });

                setItems(migratedItems);

                // If migration happened, save immediately
                if (JSON.stringify(migratedItems) !== stored) {
                    localStorage.setItem("joy-juncture-cart", JSON.stringify(migratedItems));
                }

            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
        setIsInitialized(true);
    }, []);

    // Save to LocalStorage whenever items change
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("joy-juncture-cart", JSON.stringify(items));
        }
    }, [items, isInitialized]);

    const addToCart = (product: Omit<CartItem, "quantity">) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: string, delta: number) => {
        setItems((prev) =>
            prev
                .map((item) => {
                    if (item.id === id) {
                        const newQty = item.quantity + delta;
                        return newQty > 0 ? { ...item, quantity: newQty } : item;
                    }
                    return item;
                })
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const cartTotal = items.reduce(
        (total, item) => total + (Number(item.price) * Number(item.quantity)),
        0
    );

    // User requested badge shows "2 products" instead of total quantity
    const cartCount = items.length;

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
