"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { registerForEvent, verifyEventPayment } from "@/actions/event-actions";
import { useToast } from "@/components/ui/use-toast"; // Assuming this exists or standard toast
import { useRouter } from "next/navigation";
import Script from "next/script";

// Declare Razorpay on window
declare global {
    interface Window {
        Razorpay: any;
    }
}

interface UserData {
    name?: string | null;
    email?: string | null;
    contact?: string | null;
}

interface EventRegistrationButtonProps {
    eventId: string;
    price: number | null;
    isRegistered: boolean;
    isFull: boolean;
    isActive: boolean;
    isPast: boolean;
    userData?: UserData;
}

export const EventRegistrationButton = ({
    eventId,
    price,
    isRegistered,
    isFull,
    isActive,
    isPast,
    userData
}: EventRegistrationButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    if (!isActive) return <Button disabled>Event Unavailable</Button>;
    if (isPast) return <Button disabled>Event Ended</Button>;
    if (isRegistered) return <Button variant="secondary" disabled>Registered</Button>;
    if (isFull) return <Button variant="destructive" disabled>Sold Out</Button>;

    const handleRegister = async () => {
        setIsLoading(true);
        try {
            const response = await registerForEvent(eventId);

            if (response.error) {
                toast({
                    variant: "destructive",
                    title: "Registration Failed",
                    description: response.error,
                });
                return;
            }

            // Free Event Flow or already paid logic handled by backend returning ticketCode immediately 
            // (though backend currently returns ticketCode only for free events)
            if (response.ticketCode) {
                toast({
                    title: "Success! ✅",
                    description: "You have been registered.",
                });
                router.push(`/events/confirmation?eventId=${eventId}&ticketCode=${response.ticketCode}`);
                return;
            }

            // Paid Event Flow - Razorpay
            if (response.orderId) {
                const options = {
                    key: response.key || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                    amount: response.amount,
                    currency: response.currency,
                    name: "Joy Juncture",
                    description: "Event Registration",
                    order_id: response.orderId,
                    handler: async function (response: any) {
                        try {
                            const verification = await verifyEventPayment(
                                response.razorpay_order_id,
                                response.razorpay_payment_id,
                                response.razorpay_signature
                            );

                            if (verification.success) {
                                toast({
                                    title: "Payment Successful! 🎉",
                                    description: "Ticket confirmed.",
                                });
                                router.push(`/events/confirmation?eventId=${eventId}&ticketCode=${verification.ticketCode}`);
                            } else {
                                toast({
                                    variant: "destructive",
                                    title: "Verification Failed",
                                    description: verification.error || "Payment verification failed",
                                });
                            }
                        } catch (error) {
                            console.error("Verification error", error);
                            toast({
                                variant: "destructive",
                                title: "Error",
                                description: "Failed to verify payment",
                            });
                        }
                    },
                    prefill: {
                        name: userData?.name || "",
                        email: userData?.email || "",
                        contact: userData?.contact || ""
                    },
                    theme: {
                        color: "#F4C752"
                    },
                    modal: {
                        ondismiss: function () {
                            setIsLoading(false);
                            toast({
                                title: "Payment Cancelled",
                                description: "You have not been charged.",
                                variant: "destructive"
                            });
                        }
                    }
                };

                const rzp1 = new window.Razorpay(options);
                rzp1.open();
            }

        } catch (error) {
            console.error("Registration error:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Something went wrong. Please try again.",
            });
        } finally {
            // Only stop loading if not redirected (roughly)
            // if (!window.document.hidden) {
            //    setIsLoading(false);
            // }
        }
    };

    return (
        <>
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />
            <Button onClick={handleRegister} disabled={isLoading} size="lg" className="w-full md:w-auto">
                {isLoading ? "Processing..." : (price && price > 0 ? `Book Ticket - ₹${price}` : "Register for Free")}
            </Button>
        </>
    );
};
