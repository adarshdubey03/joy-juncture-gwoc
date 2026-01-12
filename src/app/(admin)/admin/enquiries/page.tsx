"use server";

import { db } from "@/lib/db";
import { EnquiryList } from "./enquiry-list";

export default async function EnquiriesPage() {
    const enquiries = await db.experienceEnquiry.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                }
            }
        }
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Experience Enquiries</h1>
            </div>

            <div className="rounded-md border bg-white shadow-sm">
                <div className="p-4">
                    <EnquiryList enquiries={enquiries} />
                </div>
            </div>
        </div>
    );
}
