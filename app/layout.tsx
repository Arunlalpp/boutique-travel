import "./globals.css";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
            </head>
            <body>{children}</body>
        </html>
    );
}
