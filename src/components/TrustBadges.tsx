import { Truck, RotateCcw, ShieldCheck, CheckCircle } from "lucide-react";

export function TrustBadges() {
    return (
        <div className="grid grid-cols-2 gap-y-4 gap-x-8 py-6 border-t border-neutral-200/60 mt-2">
            <div className="flex items-center gap-3 text-neutral-600">
                <Truck className="w-5 h-5 text-[#F4C752]" />
                <span className="text-sm font-medium">Free Shipping</span>
            </div>
            <div className="flex items-center gap-3 text-neutral-600">
                <RotateCcw className="w-5 h-5 text-[#F4C752]" />
                <span className="text-sm font-medium">Easy Returns</span>
            </div>
            <div className="flex items-center gap-3 text-neutral-600">
                <ShieldCheck className="w-5 h-5 text-[#F4C752]" />
                <span className="text-sm font-medium">Secure Payment</span>
            </div>
            <div className="flex items-center gap-3 text-neutral-600">
                <CheckCircle className="w-5 h-5 text-[#F4C752]" />
                <span className="text-sm font-medium">Authentic Product</span>
            </div>
        </div>
    );
}
