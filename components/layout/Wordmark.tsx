export function Wordmark({ siteName, className }: { siteName: string; className?: string }) {
    return (
        <span className={className}>
            <span className="font-serif text-2xl font-light tracking-[0.01em]">{siteName}</span>
            <span aria-hidden className="ml-1 inline-block size-1.5 translate-y-[-2px] rounded-full bg-clay" />
        </span>
    );
}
