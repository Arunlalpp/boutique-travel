"use client";

import Image from "next/image";
import { useState } from "react";
import type { ImageAsset } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SmartImageProps {
    image: ImageAsset;
    sizes: string;
    priority?: boolean;
    className?: string;
    tone?: "light" | "dark";
    /** Defaults to Next's standard 75. Use ~80-85 for large hero banners, ~65-70 for small thumbnails/avatars. */
    quality?: number;
}

export function SmartImage({ image, sizes, priority, className, tone = "dark", quality }: SmartImageProps) {
    const [failed, setFailed] = useState(false);

    if (failed) {
        return (
            <div
                role="img"
                aria-label={image.alt}
                className={cn(
                    "absolute inset-0",
                    tone === "dark"
                        ? "bg-[radial-gradient(120%_90%_at_30%_20%,#2a3142_0%,#1c212c_60%,#0e1117_100%)]"
                        : "bg-[radial-gradient(120%_90%_at_30%_20%,#f2e6d4_0%,#e5d5bd_70%,#d6c2a4_100%)]",
                    className,
                )}
            />
        );
    }

    return (
        <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            priority={priority}
            quality={quality}
            onError={() => setFailed(true)}
            className={cn("object-cover", className)}
            style={image.focal ? { objectPosition: image.focal } : undefined}
        />
    );
}
