import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon } from "./Icons";
import { cn } from "@/lib/utils";

interface ButtonLinkProps {
    href: string;
    children: ReactNode;
    variant?: "ember" | "glass" | "light" | "dark";
    size?: "md" | "sm";
    arrow?: boolean;
    className?: string;
    external?: boolean;
}

export function ButtonLink({
    href,
    children,
    variant = "ember",
    size = "md",
    arrow = true,
    className,
    external,
}: ButtonLinkProps) {
    const classes = cn("btn", `btn-${variant}`, size === "sm" && "btn-sm", className);
    const content = (
        <>
            {children}
            {arrow && <ArrowIcon />}
        </>
    );

    if (external) {
        return (
            <a href={href} className={classes} target="_blank" rel="noreferrer">
                {content}
            </a>
        );
    }
    return (
        <Link href={href} className={classes}>
            {content}
        </Link>
    );
}
