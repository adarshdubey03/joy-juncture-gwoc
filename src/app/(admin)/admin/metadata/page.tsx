"use client";

import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getTags, createTag, getBadges, createBadge, getOccasions, getMoods } from "@/actions/admin/metadata-actions";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type MetadataType = "tags" | "badges" | "occasions" | "moods";

export default function MetadataPage() {
    const [tags, setTags] = useState<any[]>([]);
    const [badges, setBadges] = useState<any[]>([]);
    const [occasions, setOccasions] = useState<any[]>([]);
    const [moods, setMoods] = useState<any[]>([]);
    const [isPending, startTransition] = useTransition();
    const [newItemName, setNewItemName] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentType, setCurrentType] = useState<MetadataType>("tags");

    useEffect(() => {
        loadAll();
    }, []);

    const loadAll = async () => {
        const [tagsRes, badgesRes, occasionsRes, moodsRes] = await Promise.all([
            getTags(),
            getBadges(),
            getOccasions(),
            getMoods(),
        ]);
        if (tagsRes.data) setTags(tagsRes.data);
        if (badgesRes.data) setBadges(badgesRes.data);
        if (occasionsRes.data) setOccasions(occasionsRes.data);
        if (moodsRes.data) setMoods(moodsRes.data);
    };

    const handleCreate = () => {
        if (!newItemName.trim()) return;

        startTransition(async () => {
            let result;
            switch (currentType) {
                case "tags":
                    result = await createTag(newItemName);
                    break;
                case "badges":
                    result = await createBadge(newItemName);
                    break;
                default:
                    return;
            }

            if (result?.success) {
                setNewItemName("");
                setIsDialogOpen(false);
                loadAll();
            }
        });
    };

    const openDialog = (type: MetadataType) => {
        setCurrentType(type);
        setIsDialogOpen(true);
    };

    const getTypeLabel = () => {
        switch (currentType) {
            case "tags": return "Tag";
            case "badges": return "Badge";
            case "occasions": return "Occasion";
            case "moods": return "Mood";
        }
    };

    const canCreate = currentType === "tags" || currentType === "badges";

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Tags & Metadata</h2>
                    <p className="text-muted-foreground">Manage product taxonomy and attributes.</p>
                </div>
            </div>

            <Tabs defaultValue="tags" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="tags">Tags</TabsTrigger>
                    <TabsTrigger value="badges">Badges</TabsTrigger>
                    <TabsTrigger value="occasions">Occasions</TabsTrigger>
                    <TabsTrigger value="moods">Moods</TabsTrigger>
                </TabsList>

                {/* Tags Tab */}
                <TabsContent value="tags">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Tags ({tags.length})</CardTitle>
                            <Button onClick={() => openDialog("tags")}>
                                <Plus className="mr-2 h-4 w-4" /> Add Tag
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Slug</TableHead>
                                        <TableHead>Created</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {tags.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center h-24 text-muted-foreground">
                                                No tags found. Add one to get started.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        tags.map((tag) => (
                                            <TableRow key={tag.id}>
                                                <TableCell className="font-medium">{tag.name}</TableCell>
                                                <TableCell className="font-mono text-xs text-muted-foreground">
                                                    {tag.slug}
                                                </TableCell>
                                                <TableCell className="text-sm text-muted-foreground">
                                                    {new Date(tag.createdAt).toLocaleDateString()}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Badges Tab */}
                <TabsContent value="badges">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Badges ({badges.length})</CardTitle>
                            <Button onClick={() => openDialog("badges")}>
                                <Plus className="mr-2 h-4 w-4" /> Add Badge
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Slug</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Created</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {badges.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                                                No badges found. Add one to get started.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        badges.map((badge) => (
                                            <TableRow key={badge.id}>
                                                <TableCell className="font-medium">{badge.name}</TableCell>
                                                <TableCell className="font-mono text-xs text-muted-foreground">
                                                    {badge.slug}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={badge.isActive ? "default" : "secondary"}>
                                                        {badge.isActive ? "Active" : "Inactive"}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-sm text-muted-foreground">
                                                    {new Date(badge.createdAt).toLocaleDateString()}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Occasions Tab */}
                <TabsContent value="occasions">
                    <Card>
                        <CardHeader>
                            <CardTitle>Occasions ({occasions.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Slug</TableHead>
                                        <TableHead>Sort Order</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {occasions.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                                                No occasions found.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        occasions.map((occasion) => (
                                            <TableRow key={occasion.id}>
                                                <TableCell className="font-medium">{occasion.name}</TableCell>
                                                <TableCell className="font-mono text-xs text-muted-foreground">
                                                    {occasion.slug}
                                                </TableCell>
                                                <TableCell>{occasion.sortOrder}</TableCell>
                                                <TableCell>
                                                    <Badge variant={occasion.isActive ? "default" : "secondary"}>
                                                        {occasion.isActive ? "Active" : "Inactive"}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Moods Tab */}
                <TabsContent value="moods">
                    <Card>
                        <CardHeader>
                            <CardTitle>Moods ({moods.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Slug</TableHead>
                                        <TableHead>Sort Order</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {moods.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                                                No moods found.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        moods.map((mood) => (
                                            <TableRow key={mood.id}>
                                                <TableCell className="font-medium">{mood.name}</TableCell>
                                                <TableCell className="font-mono text-xs text-muted-foreground">
                                                    {mood.slug}
                                                </TableCell>
                                                <TableCell>{mood.sortOrder}</TableCell>
                                                <TableCell>
                                                    <Badge variant={mood.isActive ? "default" : "secondary"}>
                                                        {mood.isActive ? "Active" : "Inactive"}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Create Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New {getTypeLabel()}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                        <div>
                            <Label htmlFor="name">{getTypeLabel()} Name</Label>
                            <Input
                                id="name"
                                placeholder={`e.g., ${getTypeLabel()} Name`}
                                value={newItemName}
                                onChange={(e) => setNewItemName(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                            />
                        </div>
                        {!canCreate && (
                            <p className="text-sm text-muted-foreground">
                                {getTypeLabel()}s can only be managed in the database for now.
                            </p>
                        )}
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                Cancel
                            </Button>
                            {canCreate && (
                                <Button onClick={handleCreate} disabled={isPending || !newItemName.trim()}>
                                    Create
                                </Button>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
