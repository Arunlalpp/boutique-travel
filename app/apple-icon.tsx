import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon for iOS: the campfire mark on the night background. */
export default function AppleIcon() {
    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#0e1117",
                backgroundImage: "radial-gradient(circle at 50% 30%, #2a3550 0%, #0e1117 75%)",
            }}
        >
            <svg width="120" height="120" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="12.5" stroke="#f59e3d" strokeWidth="1.4" />
                <path d="M6 19l5-7 3 4 2-3 6 6H6z" fill="#f59e3d" />
                <circle cx="19" cy="8.5" r="1.6" fill="#f4efe8" />
            </svg>
        </div>,
        size,
    );
}
