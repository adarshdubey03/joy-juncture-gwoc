import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface WalletSectionProps {
    balance: number;
    className?: string;
}

export function WalletSection({ balance, className }: WalletSectionProps) {
    return (
        <Card className={cn("overflow-hidden border-none shadow-md", className)}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#F4C752] to-[#FFD970] opacity-100 z-0" />
            <CardHeader className="relative z-10 pb-2">
                <CardTitle className="text-neutral-900 flex items-center gap-2 text-lg font-bold">
                    <Wallet className="h-5 w-5 opacity-70" />
                    My Joy Wallet
                </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 pt-0">
                <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-4xl font-black text-neutral-900 tracking-tight">
                        {balance}
                    </span>
                    <span className="text-sm font-medium text-neutral-800 opacity-80 uppercase tracking-wide">
                        Points
                    </span>
                </div>
                <p className="text-sm text-neutral-800/70 mt-2 font-medium">
                    Use points to redeem rewards and unlock exclusive events!
                </p>
            </CardContent>
        </Card>
    );
}
