import type { SVGProps } from "react";

/**
 * The prototype's own icon set, kept as-is so the line weights match the
 * design. Every icon inherits `currentColor` and is hidden from assistive
 * technology; give the surrounding control an accessible label instead.
 */
type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "aria-hidden": true,
    focusable: false,
    ...props,
});

export const ArrowIcon = (p: IconProps) => (
    <svg {...base(p)} strokeWidth={2} strokeLinecap="round">
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
);

export const ArrowLeftIcon = (p: IconProps) => (
    <svg {...base(p)} strokeWidth={2} strokeLinecap="round">
        <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
);

export const PinIcon = (p: IconProps) => (
    <svg {...base(p)} strokeWidth={1.8}>
        <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
        <circle cx="12" cy="9.5" r="2.5" />
    </svg>
);

export const StarIcon = (p: IconProps) => (
    <svg {...base(p)} fill="currentColor" stroke="none">
        <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />
    </svg>
);

export const HeartIcon = (p: IconProps) => (
    <svg {...base(p)} strokeWidth={1.8}>
        <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" />
    </svg>
);

export const ClockIcon = (p: IconProps) => (
    <svg {...base(p)} strokeWidth={1.8} strokeLinecap="round">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
    </svg>
);

export const CheckIcon = (p: IconProps) => (
    <svg {...base(p)} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
);

export const XIcon = (p: IconProps) => (
    <svg {...base(p)} strokeWidth={2} strokeLinecap="round">
        <path d="M7 7l10 10M17 7L7 17" />
    </svg>
);

export const PlusIcon = (p: IconProps) => (
    <svg {...base(p)} strokeWidth={2.2} strokeLinecap="round">
        <path d="M12 5v14M5 12h14" />
    </svg>
);

export const LeafIcon = (p: IconProps) => (
    <svg {...base(p)} strokeWidth={1.8} strokeLinecap="round">
        <path d="M5 19C5 10 10 5 20 4c-1 10-6 15-15 15zM5 19l8-8" />
    </svg>
);

export const ShieldIcon = (p: IconProps) => (
    <svg {...base(p)} strokeWidth={1.8} strokeLinecap="round">
        <path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" />
        <path d="M8.5 12l2.5 2.5 4.5-5" />
    </svg>
);

export const CompassIcon = (p: IconProps) => (
    <svg {...base(p)} strokeWidth={1.8}>
        <circle cx="12" cy="12" r="9" />
        <path d="M15.5 8.5l-2 5-5 2 2-5z" strokeLinejoin="round" />
    </svg>
);

export const TentIcon = (p: IconProps) => (
    <svg {...base(p)} strokeWidth={1.8} strokeLinejoin="round">
        <path d="M12 4L3 20h18zM12 4v16M9 20l3-6 3 6" />
    </svg>
);

export const FoodIcon = (p: IconProps) => (
    <svg {...base(p)} strokeWidth={1.8} strokeLinecap="round">
        <path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M16 3c-2 0-3 3-3 6s1 4 3 4v8" />
    </svg>
);

export const BusIcon = (p: IconProps) => (
    <svg {...base(p)} strokeWidth={1.8} strokeLinecap="round">
        <rect x="4" y="4" width="16" height="13" rx="3" />
        <path d="M4 11h16M8 20v-3M16 20v-3" />
    </svg>
);

export const GuideIcon = (p: IconProps) => (
    <svg {...base(p)} strokeWidth={1.8} strokeLinejoin="round">
        <circle cx="12" cy="7" r="3.5" />
        <path d="M5 20l2-7h10l2 7" />
    </svg>
);

export const PhoneIcon = (p: IconProps) => (
    <svg {...base(p)} strokeWidth={1.8} strokeLinejoin="round">
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
);

export const MailIcon = (p: IconProps) => (
    <svg {...base(p)} strokeWidth={1.8} strokeLinecap="round">
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="M4 7l8 6 8-6" />
    </svg>
);

export const ChatIcon = (p: IconProps) => (
    <svg {...base(p)} strokeWidth={1.8} strokeLinejoin="round">
        <path d="M4 5h16v11H9l-5 4z" />
    </svg>
);

export const MountainIcon = (p: IconProps) => (
    <svg {...base(p)} strokeWidth={1.8} strokeLinejoin="round">
        <path d="M3 19l6-10 4 6 2-3 6 7z" />
    </svg>
);

export const PawIcon = (p: IconProps) => (
    <svg {...base(p)} fill="currentColor" stroke="none">
        <circle cx="7" cy="9" r="2" />
        <circle cx="12" cy="6.5" r="2" />
        <circle cx="17" cy="9" r="2" />
        <path d="M12 11c-3 0-5.5 3.5-5.5 6 0 1.6 1.4 2.5 3 2.2 1-.2 1.6-.6 2.5-.6s1.5.4 2.5.6c1.6.3 3-.6 3-2.2 0-2.5-2.5-6-5.5-6z" />
    </svg>
);

export const HomeIcon = (p: IconProps) => (
    <svg {...base(p)} strokeWidth={1.8} strokeLinejoin="round">
        <path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z" />
    </svg>
);

export const BagIcon = (p: IconProps) => (
    <svg {...base(p)} strokeWidth={1.8}>
        <rect x="4" y="7" width="16" height="13" rx="3" />
        <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
    </svg>
);

export const RouteIcon = (p: IconProps) => (
    <svg {...base(p)} strokeWidth={1.8} strokeLinecap="round">
        <circle cx="6" cy="18" r="2.5" />
        <circle cx="18" cy="6" r="2.5" />
        <path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5" />
    </svg>
);

export const CalendarIcon = (p: IconProps) => (
    <svg {...base(p)} strokeWidth={1.8} strokeLinecap="round">
        <rect x="3.5" y="5" width="17" height="15" rx="3" />
        <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
);

export const UserIcon = (p: IconProps) => (
    <svg {...base(p)} strokeWidth={1.8} strokeLinecap="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c1.5-4 4.5-5.5 8-5.5s6.5 1.5 8 5.5" />
    </svg>
);

export const SearchIcon = (p: IconProps) => (
    <svg {...base(p)} strokeWidth={1.8} strokeLinecap="round">
        <circle cx="11" cy="11" r="6.5" />
        <path d="M16 16l4 4" />
    </svg>
);

export const FilterIcon = (p: IconProps) => (
    <svg {...base(p)} strokeWidth={1.8} strokeLinecap="round">
        <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
        <circle cx="16" cy="7" r="2" />
        <circle cx="10" cy="17" r="2" />
    </svg>
);

export const PlayIcon = (p: IconProps) => (
    <svg {...base(p)} fill="currentColor" stroke="none">
        <path d="M8 5v14l11-7z" />
    </svg>
);

export const BedIcon = (p: IconProps) => (
    <svg {...base(p)} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" />
        <circle cx="7" cy="11" r="2" />
    </svg>
);

export const QuoteIcon = (p: IconProps) => (
    <svg {...base(p)} fill="currentColor" stroke="none">
        <path d="M5 17c0-4 1.5-7 5-9l1 1.5C9 11 8.5 12.5 8.5 14H11v5H5zm8 0c0-4 1.5-7 5-9l1 1.5c-2 1.5-2.5 3-2.5 4.5H19v5h-6z" />
    </svg>
);

export const ExpandIcon = (p: IconProps) => (
    <svg {...base(p)} strokeWidth={1.8} strokeLinecap="round">
        <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
    </svg>
);

export function LogoMark(p: IconProps) {
    return (
        <svg viewBox="0 0 28 28" fill="none" aria-hidden focusable={false} {...p}>
            <circle cx="14" cy="14" r="13" stroke="var(--color-accent)" strokeWidth="1.5" />
            <path d="M6 19l5-7 3 4 2-3 6 6H6z" fill="var(--color-accent)" />
            <circle cx="19" cy="8.5" r="1.6" fill="var(--color-ink)" />
        </svg>
    );
}
