"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { CheckIcon } from "@/components/ui/Icons";

/* ---------------------------------------------------------------------------
 * Toast: one short message at a time, announced politely to screen readers.
 * ------------------------------------------------------------------------- */
const ToastContext = createContext<(message: string) => void>(() => {});
export const useToast = () => useContext(ToastContext);

/* ---------------------------------------------------------------------------
 * Saved journeys: a per-visitor list of itinerary slugs kept in this browser
 * only. Storage can be unavailable (private mode, blocked site data), so
 * every read and write is guarded and the list simply starts empty.
 * ------------------------------------------------------------------------- */
interface SavedApi {
    saved: string[];
    isSaved: (slug: string) => boolean;
    toggle: (slug: string, title: string) => void;
    /** Increments on every save so the nav heart can replay its bump animation. */
    bumps: number;
}

const SavedContext = createContext<SavedApi>({ saved: [], isSaved: () => false, toggle: () => {}, bumps: 0 });
export const useSaved = () => useContext(SavedContext);

const STORAGE_KEY = "bt-saved";

export function SiteProviders({ children }: { children: ReactNode }) {
    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

    const toast = useCallback((text: string) => {
        setMessage(text);
        setVisible(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setVisible(false), 2400);
    }, []);

    const [saved, setSaved] = useState<string[]>([]);
    const [bumps, setBumps] = useState(0);
    const loaded = useRef(false);

    useEffect(() => {
        try {
            const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
            if (Array.isArray(raw)) setSaved(raw.filter((v): v is string => typeof v === "string"));
        } catch {
            /* storage unavailable: start empty */
        }
        loaded.current = true;
    }, []);

    useEffect(() => {
        if (!loaded.current) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
        } catch {
            /* storage unavailable: keep the list in memory only */
        }
    }, [saved]);

    const toggle = useCallback(
        (slug: string, title: string) => {
            if (saved.includes(slug)) {
                setSaved(saved.filter((s) => s !== slug));
                toast("Removed from saved");
            } else {
                setSaved([...saved, slug]);
                setBumps((b) => b + 1);
                toast(`${title} saved to your list`);
            }
        },
        [saved, toast],
    );

    const savedApi = useMemo<SavedApi>(
        () => ({ saved, isSaved: (slug) => saved.includes(slug), toggle, bumps }),
        [saved, toggle, bumps],
    );

    return (
        <ToastContext.Provider value={toast}>
            <SavedContext.Provider value={savedApi}>
                {children}
                <div className={`toast glass-strong${visible ? " on" : ""}`} role="status" aria-live="polite">
                    <CheckIcon />
                    <span>{message}</span>
                </div>
            </SavedContext.Provider>
        </ToastContext.Provider>
    );
}
