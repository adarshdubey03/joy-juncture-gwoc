"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Trash2, Plus, GripVertical, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
    question: string;
    answer: string;
    sortOrder: number;
    isActive: boolean;
}

interface FAQManagerProps {
    value: FAQ[];
    onChange: (faqs: FAQ[]) => void;
    disabled?: boolean;
}

export const FAQManager: React.FC<FAQManagerProps> = ({
    value = [],
    onChange,
    disabled = false,
}) => {
    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    const addFAQ = () => {
        const newFAQ: FAQ = {
            question: "",
            answer: "",
            sortOrder: value.length,
            isActive: true,
        };
        onChange([...value, newFAQ]);
        // Auto-expand the new FAQ
        setExpandedItems([...expandedItems, `item-${value.length}`]);
    };

    const removeFAQ = (index: number) => {
        const updated = value.filter((_, i) => i !== index);
        // Update sortOrder
        const reordered = updated.map((faq, idx) => ({ ...faq, sortOrder: idx }));
        onChange(reordered);
    };

    const updateFAQ = (index: number, field: keyof FAQ, val: any) => {
        const updated = [...value];
        updated[index] = { ...updated[index], [field]: val };
        onChange(updated);
    };

    const moveFAQ = (index: number, direction: 'up' | 'down') => {
        if ((direction === 'up' && index === 0) || (direction === 'down' && index === value.length - 1)) {
            return;
        }
        const updated = [...value];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
        // Update sortOrder
        const reordered = updated.map((faq, idx) => ({ ...faq, sortOrder: idx }));
        onChange(reordered);
    };

    const activeFAQCount = value.filter(faq => faq.isActive).length;

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-medium">Product FAQs</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                        Answer common questions customers have about this product
                    </p>
                </div>
                <div className="flex gap-2">
                    <Badge variant="secondary">{activeFAQCount} active</Badge>
                    <Badge variant="outline">{value.length} total</Badge>
                </div>
            </div>

            {/* FAQs List */}
            {value.length === 0 ? (
                <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <HelpCircle className="h-12 w-12 text-muted-foreground/50 mb-4" />
                        <p className="text-sm text-muted-foreground text-center mb-4">
                            No FAQs added yet.<br />
                            Add frequently asked questions to help customers make informed decisions!
                        </p>
                        <Button onClick={addFAQ} disabled={disabled} size="sm">
                            <Plus className="mr-2 h-4 w-4" />
                            Add First FAQ
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <Accordion type="multiple" value={expandedItems} onValueChange={setExpandedItems} className="space-y-3">
                    {value.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg">
                            <Card className="border-0 shadow-none">
                                <CardHeader className="pb-0">
                                    <div className="flex items-start gap-3">
                                        {/* Drag Handle & Order */}
                                        <div className="flex flex-col items-center gap-1 mt-2">
                                            <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                                            <Badge variant="outline" className="text-[10px] h-5 w-8">
                                                #{index + 1}
                                            </Badge>
                                        </div>

                                        {/* Status & Question Preview */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Switch
                                                    checked={faq.isActive}
                                                    onCheckedChange={(checked) => updateFAQ(index, 'isActive', checked)}
                                                    disabled={disabled}
                                                />
                                                <span className="text-xs text-muted-foreground">
                                                    {faq.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>
                                            <AccordionTrigger className="hover:no-underline py-0">
                                                <div className="text-left">
                                                    {faq.question || (
                                                        <span className="text-muted-foreground italic">Question not set</span>
                                                    )}
                                                </div>
                                            </AccordionTrigger>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-col gap-1">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="h-7 w-7"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    moveFAQ(index, 'up');
                                                }}
                                                disabled={disabled || index === 0}
                                            >
                                                <ChevronUp className="h-3 w-3" />
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="h-7 w-7"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    moveFAQ(index, 'down');
                                                }}
                                                disabled={disabled || index === value.length - 1}
                                            >
                                                <ChevronDown className="h-3 w-3" />
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="h-7 w-7 text-destructive"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeFAQ(index);
                                                }}
                                                disabled={disabled}
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>

                                <AccordionContent className="pb-4 px-6">
                                    <div className="space-y-4 pt-2">
                                        {/* Question */}
                                        <div>
                                            <Label className="text-xs">Question *</Label>
                                            <Input
                                                value={faq.question}
                                                onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                                                placeholder="e.g., Can I use this product as a drinking game?"
                                                disabled={disabled}
                                                className="mt-1"
                                            />
                                        </div>

                                        {/* Answer */}
                                        <div>
                                            <Label className="text-xs">Answer *</Label>
                                            <Textarea
                                                value={faq.answer}
                                                onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                                                placeholder="Provide a helpful, detailed answer..."
                                                rows={4}
                                                disabled={disabled}
                                                className="mt-1"
                                            />
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {faq.answer.length} characters
                                            </p>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </Card>
                        </AccordionItem>
                    ))}
                </Accordion>
            )}

            {/* Add Button */}
            {value.length > 0 && (
                <Button
                    type="button"
                    variant="outline"
                    onClick={addFAQ}
                    disabled={disabled}
                    className="w-full"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Another FAQ
                </Button>
            )}

            {/* Quick Tips */}
            {value.length > 0 && (
                <Card className="bg-muted/50">
                    <CardContent className="pt-4">
                        <p className="text-xs text-muted-foreground">
                            <strong>💡 Tips:</strong> Use the switch to show/hide FAQs. Drag to reorder. Keep answers concise but helpful (2-3 sentences ideal).
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};
