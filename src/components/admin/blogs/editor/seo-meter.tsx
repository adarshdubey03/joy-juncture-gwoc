"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle } from "lucide-react";

interface SEOMeterProps {
    score: number;
    suggestions: string[];
}

export function SEOMeter({ score, suggestions }: SEOMeterProps) {
    const [color, setColor] = useState("bg-red-500");

    useEffect(() => {
        if (score >= 80) setColor("bg-green-500");
        else if (score >= 60) setColor("bg-yellow-500");
        else setColor("bg-red-500");
    }, [score]);

    return (
        <div className="space-y-4 p-4 border rounded-lg bg-white">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">SEO Health</h3>
                <Badge variant="outline" className={score >= 80 ? "text-green-600 border-green-200" : "text-yellow-600"}>
                    {score}/100
                </Badge>
            </div>
            <Progress value={score} className="h-2" indicatorColor={color} />

            <div className="space-y-2">
                {suggestions.map((rec, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        {score >= 80 ? (
                            <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                        ) : (
                            <AlertCircle className="h-3 w-3 text-yellow-500 mt-0.5 shrink-0" />
                        )}
                        <span>{rec}</span>
                    </div>
                ))}
                {suggestions.length === 0 && score > 0 && (
                    <p className="text-xs text-muted-foreground italic">AI analysis pending or incomplete.</p>
                )}
            </div>
        </div>
    );
}
