"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { createReview } from "@/actions/review-actions";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface EventReviewFormProps {
    eventId: string;
}

export const EventReviewForm = ({ eventId }: EventReviewFormProps) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleSubmit = () => {
        if (!comment.trim()) {
            toast({ title: "Please write a comment", variant: "destructive" });
            return;
        }

        startTransition(async () => {
            const res = await createReview(eventId, rating, comment);
            if (res.error) {
                toast({ title: "Error", description: res.error, variant: "destructive" });
            } else {
                toast({ title: "Success", description: "Review submitted!" });
                setComment("");
                router.refresh();
            }
        });
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-4">
            <h3 className="text-xl font-bold">Leave a Review</h3>

            <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none transition-transform hover:scale-110"
                    >
                        <Star
                            className={`w-8 h-8 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                    </button>
                ))}
            </div>

            <Textarea
                placeholder="Share your experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                disabled={isPending}
            />

            <Button onClick={handleSubmit} disabled={isPending} className="w-full">
                {isPending ? "Submitting..." : "Submit Review"}
            </Button>
        </div>
    );
};
