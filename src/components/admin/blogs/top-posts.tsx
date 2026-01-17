"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Eye, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

interface TopPostsProps {
    posts: {
        id: string;
        title: string;
        viewCount: number;
        publishedAt: Date | null;
        slug: string;
    }[];
}

export function TopPosts({ posts }: TopPostsProps) {
    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle className="text-sm font-medium">Top Performing Posts</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {posts.map((post, index) => (
                        <div key={post.id} className="flex items-start justify-between border-b pb-3 last:border-0 last:pb-0">
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none truncate max-w-[200px]">
                                    {index + 1}. {post.title}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Eye className="h-3 w-3" /> {(post.viewCount / 1000).toFixed(1)}K
                                    </span>
                                    {post.publishedAt && (
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" /> {format(new Date(post.publishedAt), "MMM d")}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <Link href={`/blogs/${post.slug}`} className="text-muted-foreground hover:text-black">
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    ))}
                    {posts.length === 0 && (
                        <div className="text-center text-xs text-muted-foreground py-4">
                            No data available yet.
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
