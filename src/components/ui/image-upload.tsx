"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash, Star } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div>
            {/* Image Count Badge */}
            {value.length > 0 && (
                <div className="mb-2 text-sm text-muted-foreground">
                    {value.length} {value.length === 1 ? 'image' : 'images'} uploaded
                    {value.length > 0 && <span className="ml-2 text-xs">(First image is the primary)</span>}
                </div>
            )}

            {/* Images Grid */}
            <div className="mb-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {value.map((url, index) => (
                    <div key={url} className="relative w-full aspect-square rounded-lg overflow-hidden border-2 border-border hover:border-primary transition-colors group">
                        {/* Primary Image Badge */}
                        {index === 0 && (
                            <div className="absolute top-2 left-2 z-20 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                                <Star className="h-3 w-3 fill-current" />
                                Primary
                            </div>
                        )}

                        {/* Delete Button */}
                        <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                                type="button"
                                onClick={() => onRemove(url)}
                                variant="destructive"
                                size="icon"
                                className="h-8 w-8"
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Image */}
                        <Image
                            fill
                            className="object-cover"
                            alt={`Product image ${index + 1}`}
                            src={url}
                        />

                        {/* Image Number Badge */}
                        <div className="absolute bottom-2 left-2 z-20 bg-black/60 text-white px-2 py-0.5 rounded text-xs">
                            #{index + 1}
                        </div>
                    </div>
                ))}
            </div>

            {/* Upload Button */}
            <CldUploadWidget
                onSuccess={onUpload}
                uploadPreset="joy-juncture-preset"
            >
                {({ open }) => {
                    const onClick = () => {
                        open();
                    }

                    return (
                        <Button
                            type="button"
                            disabled={disabled}
                            variant={value.length === 0 ? "default" : "secondary"}
                            onClick={onClick}
                            className="w-full"
                        >
                            <ImagePlus className="h-4 w-4 mr-2" />
                            {value.length === 0 ? 'Upload Product Images' : 'Add Another Image'}
                        </Button>
                    )
                }}
            </CldUploadWidget>

            {/* Helper Text */}
            {value.length === 0 ? (
                <p className="mt-2 text-xs text-muted-foreground text-center">
                    Click to upload multiple images. The first image will be the primary product image.
                </p>
            ) : (
                <p className="mt-2 text-xs text-muted-foreground text-center">
                    You can add more images. Drag to reorder (coming soon) or delete unwanted images.
                </p>
            )}
        </div>
    )
}

export default ImageUpload;
