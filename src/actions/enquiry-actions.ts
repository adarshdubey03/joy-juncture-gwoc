"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

// Type definitions
export type EnquiryData = {
    name: string;
    company?: string;
    email: string;
    phone?: string;
    type: string; // Corporate, Wedding, etc.
    message: string;
    guestCount?: string;
    budget?: number;
    preferredDate?: Date;
};

// 1. Submit Enquiry (Public/User)
export async function submitExperienceEnquiry(data: EnquiryData) {
    try {
        const session = await auth();
        const userId = session?.user?.id;

        await db.experienceEnquiry.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                company: data.company,
                type: data.type,
                message: data.message,
                guestCount: data.guestCount,
                userId: userId || null,
            },
        });

        revalidatePath("/admin/enquiries");

        return { success: true };
    } catch (error) {
        console.error("Failed to submit enquiry:", error);
        return { success: false, error: "Failed to submit enquiry. Please try again." };
    }
}

// 2. Confirm Enquiry and Award Points (Admin)
export async function confirmExperienceEnquiry(enquiryId: string, points: number) {
    try {
        const session = await auth();
        // if (session?.user?.role !== "ADMIN") return { error: "Unauthorized" }; 

        const enquiry = await db.experienceEnquiry.findUnique({
            where: { id: enquiryId }
        });

        if (!enquiry) return { error: "Enquiry not found" };
        if (enquiry.status === "CONFIRMED") return { error: "Already confirmed" };

        let targetUserId = enquiry.userId;

        // If not linked, try to find by email
        if (!targetUserId) {
            const user = await db.user.findUnique({
                where: { email: enquiry.email }
            });
            if (user) targetUserId = user.id;
        }

        if (!targetUserId) {
            return { error: "User matches this enquiry email not found. Cannot award points." };
        }

        // Transaction: Update Status + Award Points
        await db.$transaction(async (tx) => {
            // 1. Update Enquiry
            await tx.experienceEnquiry.update({
                where: { id: enquiryId },
                data: {
                    status: "CONFIRMED",
                    userId: targetUserId // Link if found by email
                }
            });

            // 2. Award Points
            if (points > 0) {
                await tx.wallet.upsert({
                    where: { userId: targetUserId as string },
                    create: { userId: targetUserId as string, balance: points },
                    update: { balance: { increment: points } }
                });

                await tx.pointTransaction.create({
                    data: {
                        userId: targetUserId as string,
                        amount: points,
                        reason: "BONUS",
                        description: `Bonus for ${enquiry.type} Experience Enquiry Confirmation`
                    }
                });
            }
        });

        revalidatePath("/admin/enquiries");
        revalidatePath("/profile");

        return { success: true };

    } catch (error) {
        console.error("CONFIRM_ENQUIRY_ERROR", error);
        return { error: "Failed to confirm request" };
    }
}
