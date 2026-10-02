import "./globals.css";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
            </head>
            {/* Browser extensions (e.g. Grammarly) add attributes to <body>; ignore those mismatches. */}
            <body suppressHydrationWarning>{children}</body>
        </html>
    );
}
