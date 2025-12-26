"use client";

import * as React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StickyBuyBar } from "@/components/shop/sticky-buy-bar";
import { formatCurrency, cn } from "@/lib/utils";
import { Star, Minus, Plus, ShoppingCart, Check, Users, Clock, Heart, Package, Award, Sparkles, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { getProductBySlug } from "@/lib/products";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";

export default function ProductPage() {
    const router = useRouter();
    const params = useParams();
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = React.useState(false);
    
    const slug = params?.slug as string;
    const product = React.useMemo(() => {
        if (!slug) return undefined;
        return getProductBySlug(slug);
    }, [slug]);

    if (!slug) {
        return (
            <main className="min-h-screen bg-white flex items-center justify-center">
                <Navbar />
                <div className="text-center">
                    <p className="text-gray-600">Loading...</p>
                </div>
                <Footer />
            </main>
        );
    }

    if (!product) {
        return (
            <main className="min-h-screen bg-white flex items-center justify-center">
                <Navbar />
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
                    <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
                    <p className="text-sm text-gray-400 mb-4">Slug received: {slug}</p>
                    <Button onClick={() => router.push("/shop")}>Back to Shop</Button>
                </div>
                <Footer />
            </main>
        );
    }

    const [activeTab, setActiveTab] = React.useState("overview");
    const [quantity, setQuantity] = React.useState(1);
    const [showStickyBar, setShowStickyBar] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState(0);
    const heroRef = React.useRef<HTMLDivElement>(null);

    const handleAddToCart = () => {
        if (!product) return;
        setIsAdding(true);
        addToCart(product, quantity);
        setTimeout(() => {
            setIsAdding(false);
            // Optional: Show a toast notification here
        }, 500);
    };

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setShowStickyBar(!entry.isIntersecting);
            },
            { threshold: 0 }
        );

        if (heroRef.current) {
            observer.observe(heroRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const mockReviews = [
        { name: "Priya S.", rating: 5, date: "2 days ago", comment: "Absolutely love this game! Brought it to a party and it was a hit. Everyone was laughing the whole time." },
        { name: "Rahul M.", rating: 5, date: "1 week ago", comment: "Perfect for game nights. The quality is great and the rules are easy to understand." },
        { name: "Anjali K.", rating: 4, date: "2 weeks ago", comment: "Really fun game! Only complaint is that rounds go by too fast - we always want to play more." },
    ];

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Breadcrumb */}
            <div className="pt-24 pb-4 container mx-auto px-4">
                <Link href="/shop" className="inline-flex items-center gap-2 text-gray-500 hover:text-accent transition-colors text-sm">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Shop</span>
                </Link>
            </div>

            {/* Product Hero Section */}
            <div className="container mx-auto px-4 pb-12" ref={heroRef}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="aspect-square rounded-3xl bg-gray-100 relative overflow-hidden group cursor-zoom-in"
                        >
                            {product.images[selectedImage]?.startsWith('/') ? (
                                <img
                                    src={product.images[selectedImage]}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            ) : (
                                <div className={`w-full h-full ${product.images[selectedImage]} transition-transform duration-700 group-hover:scale-110`} />
                            )}
                            {product.badges && product.badges.length > 0 && (
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    {product.badges.map((badge) => (
                                        <Badge key={badge} variant="accent" className="shadow-lg">
                                            {badge}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                        <div className="grid grid-cols-3 gap-4">
                            {product.images.map((img, i) => (
                                <motion.button
                                    key={i}
                                    onClick={() => setSelectedImage(i)}
                                    className={cn(
                                        "aspect-square rounded-xl bg-gray-100 cursor-pointer overflow-hidden hover:ring-2 ring-accent transition-all",
                                        selectedImage === i && "ring-2 ring-accent"
                                    )}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {img?.startsWith('/') ? (
                                        <img
                                            src={img}
                                            alt={`${product.name} view ${i + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className={`w-full h-full ${img}`} />
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-sm text-gray-500 uppercase tracking-wide">{product.category}</span>
                                <div className="flex items-center text-yellow-500 text-sm font-bold">
                                    <Star className="w-4 h-4 fill-current mr-1" />
                                    {product.rating} <span className="text-gray-400 ml-1">({product.reviews} reviews)</span>
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 leading-tight">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-4 mb-6">
                                {product.originalPrice && (
                                    <span className="text-xl text-gray-400 line-through">
                                        {formatCurrency(product.originalPrice)}
                                    </span>
                                )}
                                <span className="text-3xl font-bold text-accent">
                                    {formatCurrency(product.price)}
                                </span>
                                {product.originalPrice && (
                                    <Badge className="bg-green-100 text-green-700">
                                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                    </Badge>
                                )}
                            </div>

                            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                {product.description}
                            </p>

                            {/* Quick Features */}
                            <div className="grid grid-cols-3 gap-4 mb-8">
                                {product.features.map((feature, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + i * 0.1 }}
                                        className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl text-center border border-gray-200"
                                    >
                                        {i === 0 ? (
                                            <Users className="w-6 h-6 mb-2 text-primary" />
                                        ) : i === 1 ? (
                                            <Clock className="w-6 h-6 mb-2 text-primary" />
                                        ) : (
                                            <Award className="w-6 h-6 mb-2 text-primary" />
                                        )}
                                        <span className="font-bold text-sm text-gray-800">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Add to Cart */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex items-center border-2 border-gray-200 rounded-full px-4 py-3">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>

                                <Button
                                    size="lg"
                                    className="flex-1 rounded-full h-14 text-lg gap-2 shadow-xl shadow-accent/20 hover:shadow-accent/30 transition-shadow"
                                    onClick={handleAddToCart}
                                    disabled={isAdding}
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    {isAdding ? "Adding..." : `Add to Cart - ${formatCurrency(product.price * quantity)}`}
                                </Button>
                            </div>

                            {/* Trust Badges */}
                            <div className="flex items-center gap-6 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <Package className="w-5 h-5 text-green-600" />
                                    <span>Free Shipping</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="w-5 h-5 text-green-600" />
                                    <span>Easy Returns</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div className="border-b border-gray-200 mb-12">
                    <div className="flex gap-8 overflow-x-auto">
                        {[
                            { id: "overview", label: "Overview" },
                            { id: "how-to-play", label: "How to Play" },
                            { id: "reviews", label: "Reviews" },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "px-6 py-4 text-lg font-semibold transition-colors border-b-2 whitespace-nowrap",
                                    activeTab === tab.id
                                        ? "border-accent text-accent"
                                        : "border-transparent text-gray-400 hover:text-gray-700"
                                )}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="max-w-4xl mx-auto">
                    {activeTab === "overview" && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-12"
                        >
                            {/* What You'll Love */}
                            {product.whatYoullLove && product.whatYoullLove.length > 0 && (
                                <section>
                                    <div className="flex items-center gap-3 mb-6">
                                        <Heart className="w-6 h-6 text-red-500" />
                                        <h2 className="text-3xl font-bold text-gray-900">What You'll Love</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {product.whatYoullLove.map((item, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="flex items-start gap-3 p-4 bg-gradient-to-br from-pink-50 to-red-50 rounded-xl border border-pink-100"
                                            >
                                                <Sparkles className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" />
                                                <p className="text-gray-700 font-medium">{item}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Story */}
                            <section>
                                <h2 className="text-3xl font-bold mb-6 text-gray-900">The Story</h2>
                                <div className="prose prose-lg max-w-none">
                                    <p className="text-gray-700 leading-relaxed text-lg">
                                        {product.story}
                                    </p>
                                </div>
                            </section>

                            {/* What's Included */}
                            {product.included && product.included.length > 0 && (
                                <section>
                                    <h2 className="text-3xl font-bold mb-6 text-gray-900">What's Included</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {product.included.map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                                                <span className="text-gray-700">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Specifications */}
                            {product.specifications && (
                                <section>
                                    <h2 className="text-3xl font-bold mb-6 text-gray-900">Specifications</h2>
                                    <div className="bg-gray-50 rounded-2xl p-6">
                                        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {Object.entries(product.specifications).map(([key, value]) => (
                                                <div key={key} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                                                    <dt className="font-semibold text-gray-700">{key}</dt>
                                                    <dd className="text-gray-600">{value}</dd>
                                                </div>
                                            ))}
                                        </dl>
                                    </div>
                                </section>
                            )}

                            {/* Perfect For */}
                            {product.occasion && product.occasion.length > 0 && (
                                <section>
                                    <h2 className="text-3xl font-bold mb-6 text-gray-900">Perfect For</h2>
                                    <div className="flex flex-wrap gap-3">
                                        {product.occasion.map((occ, i) => (
                                            <Badge key={i} variant="outline" className="px-4 py-2 text-base">
                                                {occ}
                                            </Badge>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </motion.div>
                    )}

                    {activeTab === "how-to-play" && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            <h2 className="text-3xl font-bold mb-8 text-gray-900">How to Play</h2>
                            {product.howToPlay.map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-6 p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl border border-primary/10"
                                >
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-lg">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2 text-gray-900">Step {i + 1}</h3>
                                        <p className="text-gray-700 text-lg leading-relaxed">{step}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {activeTab === "reviews" && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {/* Review Summary */}
                            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 text-center mb-12 border border-yellow-100">
                                <div className="flex items-center justify-center gap-3 mb-4">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-8 h-8 fill-current" />
                                        ))}
                                    </div>
                                    <span className="font-bold text-3xl text-gray-900">{product.rating}</span>
                                </div>
                                <p className="text-gray-600 text-lg">Based on {product.reviews} customer reviews</p>
                            </div>

                            {/* Individual Reviews */}
                            <div className="space-y-6">
                                {mockReviews.map((review, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <h4 className="font-bold text-gray-900">{review.name}</h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className="flex text-yellow-400">
                                                        {[...Array(5)].map((_, j) => (
                                                            <Star
                                                                key={j}
                                                                className={`w-4 h-4 ${j < review.rating ? "fill-current" : "text-gray-300"}`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-sm text-gray-500">{review.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            <StickyBuyBar 
                productName={product.name} 
                price={product.price} 
                isVisible={showStickyBar}
                product={product}
                quantity={quantity}
                setQuantity={setQuantity}
            />
            <Footer />
        </main>
    );
}
