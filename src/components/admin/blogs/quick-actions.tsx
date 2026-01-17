"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, FileUp, Zap, BarChart } from "lucide-react";
import Link from "next/link";

export function QuickActions() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
                <Button className="w-full justify-start" asChild>
                    <Link href="/admin/blogs/new">
                        <PlusCircle className="mr-2 h-4 w-4" /> New Post
                    </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                    <FileUp className="mr-2 h-4 w-4" /> Import Draft
                </Button>
                <Button variant="outline" className="w-full justify-start">
                    <Zap className="mr-2 h-4 w-4" /> Content Ideas
                </Button>
                <Button variant="outline" className="w-full justify-start">
                    <BarChart className="mr-2 h-4 w-4" /> Analytics
                </Button>
            </CardContent>
        </Card>
    );
}
