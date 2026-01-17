"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface ContentCalendarProps {
    scheduledPosts: {
        id: string;
        title: string;
        publishedAt: Date | null;
    }[];
}

export function ContentCalendar({ scheduledPosts }: ContentCalendarProps) {
    return (
        <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Content</CardTitle>
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {scheduledPosts.map((post) => (
                        <div key={post.id} className="flex items-center gap-3 border-l-2 border-blue-500 pl-3 py-1">
                            <div className="text-xs font-bold text-gray-500 w-12 text-center leading-tight">
                                <span className="block text-lg text-black">{post.publishedAt ? format(new Date(post.publishedAt), "d") : "-"}</span>
                                <span className="uppercase">{post.publishedAt ? format(new Date(post.publishedAt), "MMM") : "-"}</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium line-clamp-1">{post.title}</p>
                                <p className="text-xs text-muted-foreground">
                                    {post.publishedAt ? format(new Date(post.publishedAt), "h:mm a") : "Draft"}
                                </p>
                            </div>
                        </div>
                    ))}
                    {scheduledPosts.length === 0 && (
                        <div className="text-center text-xs text-muted-foreground py-8">
                            No posts scheduled.
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
