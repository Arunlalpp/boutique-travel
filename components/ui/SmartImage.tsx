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
  /** Tone of the fallback panel if the image can't load */
  tone?: "light" | "dark";
}

/**
 * Fill-mode image with a graceful fallback. Always place inside a
 * positioned parent with a defined aspect ratio or height.
 */
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
            ? "bg-[radial-gradient(120%_90%_at_30%_20%,#4a4238_0%,#221f1b_60%,#151412_100%)]"
            : "bg-[radial-gradient(120%_90%_at_30%_20%,#efe8dc_0%,#ddd3c3_70%,#cfc3b0_100%)]",
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
