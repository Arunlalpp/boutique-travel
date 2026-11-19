import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon for iOS: the elephant footprint from the Ledger, ochre on navy. */
export default function AppleIcon() {
    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#1c2f3d",
            }}
        >
            <svg width="112" height="112" viewBox="0 0 32 32" fill="#d9a55b">
                <ellipse cx="16" cy="19" rx="10" ry="9.5" />
                <circle cx="8.5" cy="8.6" r="2.5" />
                <circle cx="13.6" cy="6.4" r="2.6" />
                <circle cx="18.9" cy="6.4" r="2.6" />
                <circle cx="23.9" cy="8.6" r="2.5" />
            </svg>
        </div>,
        size,
    );
}
