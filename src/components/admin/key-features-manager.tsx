"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, GripVertical, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface KeyFeature {
    title: string;
    description?: string;
    icon?: string;
    sortOrder: number;
}

interface KeyFeaturesManagerProps {
    value: KeyFeature[];
    onChange: (features: KeyFeature[]) => void;
    disabled?: boolean;
}

export const KeyFeaturesManager: React.FC<KeyFeaturesManagerProps> = ({
    value = [],
    onChange,
    disabled = false,
}) => {
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const addFeature = () => {
        const newFeature: KeyFeature = {
            title: "",
            description: "",
            icon: "✨",
            sortOrder: value.length,
        };
        onChange([...value, newFeature]);
        setEditingIndex(value.length);
    };

    const removeFeature = (index: number) => {
        const updated = value.filter((_, i) => i !== index);
        // Update sortOrder
        const reordered = updated.map((feat, idx) => ({ ...feat, sortOrder: idx }));
        onChange(reordered);
        setEditingIndex(null);
    };

    const updateFeature = (index: number, field: keyof KeyFeature, val: any) => {
        const updated = [...value];
        updated[index] = { ...updated[index], [field]: val };
        onChange(updated);
    };

    const moveFeature = (index: number, direction: 'up' | 'down') => {
        if ((direction === 'up' && index === 0) || (direction === 'down' && index === value.length - 1)) {
            return;
        }
        const updated = [...value];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
        // Update sortOrder
        const reordered = updated.map((feat, idx) => ({ ...feat, sortOrder: idx }));
        onChange(reordered);
    };

    // Common emoji icons for quick selection
    const commonIcons = ['✨', '🎯', '🚀', '⚡', '🎮', '🎲', '🏆', '💎', '🔥', '⭐', '🎨', '💡'];

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-medium">Key Features</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                        Highlight what makes this product special (4-6 features recommended)
                    </p>
                </div>
                <Badge variant="secondary">{value.length} features</Badge>
            </div>

            {/* Features List */}
            {value.length === 0 ? (
                <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Sparkles className="h-12 w-12 text-muted-foreground/50 mb-4" />
                        <p className="text-sm text-muted-foreground text-center mb-4">
                            No key features added yet.<br />
                            Add features to highlight what makes this product unique!
                        </p>
                        <Button onClick={addFeature} disabled={disabled} size="sm">
                            <Plus className="mr-2 h-4 w-4" />
                            Add First Feature
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-3">
                    {value.map((feature, index) => (
                        <Card key={index} className={editingIndex === index ? "border-primary" : ""}>
                            <CardHeader className="pb-3">
                                <div className="flex items-start gap-3">
                                    {/* Drag Handle */}
                                    <div className="flex flex-col gap-1 mt-1">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 cursor-move"
                                            disabled={disabled}
                                        >
                                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                                        </Button>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 space-y-3">
                                        {/* Icon Selector */}
                                        <div>
                                            <Label className="text-xs">Icon/Emoji</Label>
                                            <div className="flex gap-1 mt-1 flex-wrap">
                                                {commonIcons.map((emoji) => (
                                                    <Button
                                                        key={emoji}
                                                        type="button"
                                                        variant={feature.icon === emoji ? "default" : "outline"}
                                                        size="sm"
                                                        className="h-8 w-8 p-0 text-lg"
                                                        onClick={() => updateFeature(index, 'icon', emoji)}
                                                        disabled={disabled}
                                                    >
                                                        {emoji}
                                                    </Button>
                                                ))}
                                                <Input
                                                    type="text"
                                                    value={feature.icon || ''}
                                                    onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                                                    placeholder="Or type..."
                                                    className="h-8 w-20"
                                                    maxLength={2}
                                                    disabled={disabled}
                                                />
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <div>
                                            <Label className="text-xs">Feature Title *</Label>
                                            <Input
                                                value={feature.title}
                                                onChange={(e) => updateFeature(index, 'title', e.target.value)}
                                                placeholder="e.g., Dual Gameplay"
                                                disabled={disabled}
                                                className="mt-1"
                                            />
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <Label className="text-xs">Description</Label>
                                            <Textarea
                                                value={feature.description || ''}
                                                onChange={(e) => updateFeature(index, 'description', e.target.value)}
                                                placeholder="Describe this feature in detail..."
                                                rows={2}
                                                disabled={disabled}
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-1">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => moveFeature(index, 'up')}
                                            disabled={disabled || index === 0}
                                        >
                                            ↑
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => moveFeature(index, 'down')}
                                            disabled={disabled || index === value.length - 1}
                                        >
                                            ↓
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-destructive"
                                            onClick={() => removeFeature(index)}
                                            disabled={disabled}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            )}

            {/* Add Button */}
            {value.length > 0 && (
                <Button
                    type="button"
                    variant="outline"
                    onClick={addFeature}
                    disabled={disabled}
                    className="w-full"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Another Feature
                </Button>
            )}
        </div>
    );
};
