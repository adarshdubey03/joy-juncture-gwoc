export interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    originalPrice?: number;
    description: string;
    image: string;
    images: string[];
    category: string;
    badges?: string[];
    rating: number;
    reviews: number;
    features?: string[];
    story?: string;
    howToPlay?: string[];
    whatYoullLove?: string[];
    occasion?: string[];
    mood?: string;
    players?: string;
    duration?: string;
    included?: string[];
    specifications?: Record<string, string>;
}
