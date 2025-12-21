import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WalletDashboard } from "@/components/community/wallet-dashboard";

export default function WalletPage() {
    return (
        <main className="min-h-screen bg-secondary">
            <Navbar />
            <div className="pt-32 pb-20 container mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8">My Wallet</h1>
                <WalletDashboard />
            </div>
            <Footer />
        </main>
    );
}
