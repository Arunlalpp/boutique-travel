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
}

export function SmartImage({ image, sizes, priority, className, tone = "dark" }: SmartImageProps) {
    const [failed, setFailed] = useState(false);

    if (failed) {
        return (
            <div
                role="img"
                aria-label={image.alt}
                className={cn(
                    "absolute inset-0",
                    tone === "dark"
                        ? "bg-[radial-gradient(120%_90%_at_30%_20%,#2e3a37_0%,#182421_60%,#0d1a17_100%)]"
                        : "bg-[radial-gradient(120%_90%_at_30%_20%,#e2e8e1_0%,#cdd6c8_70%,#b9c4b3_100%)]",
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
            onError={() => setFailed(true)}
            className={cn("object-cover", className)}
            style={image.focal ? { objectPosition: image.focal } : undefined}
        />
    );
}
