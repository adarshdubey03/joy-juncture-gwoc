"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle, Clock, Eye, TrendingUp, Users } from "lucide-react";

interface BlogStatsProps {
    stats: {
        totalPosts: number;
        published: number;
        drafts: number;
        scheduled: number;
        totalViews: number;
        avgReadTimeSeconds: number;
    };
}

export function BlogStats({ stats }: BlogStatsProps) {
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.round(seconds % 60);
        return `${minutes}m ${remainingSeconds}s`;
    };

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* CONTENT OVERVIEW */}
            <Card className="col-span-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Content Overview</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-4 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold">{stats.totalPosts}</div>
                            <p className="text-xs text-muted-foreground">Total Posts</p>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-green-600">{stats.published}</div>
                            <p className="text-xs text-muted-foreground">Published</p>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-yellow-600">{stats.drafts}</div>
                            <p className="text-xs text-muted-foreground">Drafts</p>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-blue-600">{stats.scheduled}</div>
                            <p className="text-xs text-muted-foreground">Scheduled</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* PERFORMANCE METRICS */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{(stats.totalViews / 1000).toFixed(1)}K</div>
                    <p className="text-xs text-muted-foreground">All time views</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Time</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatTime(stats.avgReadTimeSeconds)}</div>
                    <p className="text-xs text-muted-foreground">Est. read time</p>
                </CardContent>
            </Card>
        </div>
    );
}
