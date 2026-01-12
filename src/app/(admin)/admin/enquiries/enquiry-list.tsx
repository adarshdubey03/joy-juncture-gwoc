"use client";

import { useState } from "react";
import { format } from "date-fns";
import { confirmExperienceEnquiry } from "@/actions/enquiry-actions";

type Enquiry = {
    id: string;
    createdAt: Date;
    name: string;
    email: string;
    company: string | null;
    type: string;
    status: string;
    guestCount: string | null;
    message: string;
    user: { name: string | null; email: string | null } | null;
    userId: string | null;
};

export function EnquiryList({ enquiries }: { enquiries: Enquiry[] }) {
    const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
    const [confirmingId, setConfirmingId] = useState<string | null>(null);
    const [points, setPoints] = useState(100); // Default points

    const handleConfirm = async () => {
        if (!selectedEnquiry) return;
        setConfirmingId(selectedEnquiry.id);

        const result = await confirmExperienceEnquiry(selectedEnquiry.id, points);

        if (result.success) {
            setSelectedEnquiry(null);
        } else {
            alert(result.error || "Failed to confirm");
        }
        setConfirmingId(null);
    };

    return (
        <div>
            {/* Confirmation Modal */}
            {selectedEnquiry && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 space-y-4">
                        <h3 className="text-xl font-bold">Confirm Enquiry</h3>
                        <p className="text-gray-600">
                            Confirm inquiry for <strong>{selectedEnquiry.name}</strong> ({selectedEnquiry.type})?
                        </p>

                        {!selectedEnquiry.userId && !selectedEnquiry.user && (
                            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 text-sm text-yellow-800">
                                ⚠️ User is not linked. We will try to link by email: {selectedEnquiry.email}.
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium mb-1">Award Points</label>
                            <input
                                type="number"
                                value={points}
                                onChange={(e) => setPoints(Number(e.target.value))}
                                className="w-full border rounded-lg px-3 py-2"
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                onClick={() => setSelectedEnquiry(null)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                disabled={!!confirmingId}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                                disabled={!!confirmingId}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                            >
                                {confirmingId ? "Confirming..." : "Confirm & Award"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                        <tr>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Client</th>
                            <th className="px-4 py-3">Type</th>
                            <th className="px-4 py-3">Guests</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Linked User</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enquiries.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                                    No enquiries found.
                                </td>
                            </tr>
                        ) : (
                            enquiries.map((enquiry) => (
                                <tr key={enquiry.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        {format(new Date(enquiry.createdAt), "MMM d, yyyy")}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="font-semibold">{enquiry.name}</div>
                                        <div className="text-xs text-gray-500">{enquiry.email}</div>
                                        {enquiry.company && <div className="text-xs text-blue-600">{enquiry.company}</div>}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {enquiry.type}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        {enquiry.guestCount || "-"}
                                    </td>
                                    <td className="px-4 py-3">
                                        <StatusBadge status={enquiry.status} />
                                    </td>
                                    <td className="px-4 py-3">
                                        {enquiry.userId || enquiry.user ? (
                                            <span className="text-green-600 font-medium text-xs">✓ Linked</span>
                                        ) : (
                                            <span className="text-gray-400 text-xs">Unlinked</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-right space-x-2">
                                        {enquiry.status !== "CONFIRMED" && (
                                            <button
                                                onClick={() => setSelectedEnquiry(enquiry)}
                                                className="text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md text-xs font-medium transition-colors"
                                            >
                                                Confirm
                                            </button>
                                        )}
                                        {/* View Details could be added here */}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const colors: Record<string, string> = {
        NEW: "bg-blue-100 text-blue-800",
        CONTACTED: "bg-yellow-100 text-yellow-800",
        CONFIRMED: "bg-green-100 text-green-800",
        CLOSED: "bg-gray-100 text-gray-800"
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || "bg-gray-100 text-gray-800"}`}>
            {status}
        </span>
    );
}
