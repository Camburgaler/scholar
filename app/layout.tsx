import "@/app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL("https://scholar.camburgaler.com"),
    title: "SCHOLAR",
    description:
        "A build optimizer for Dark Souls II: Scholar of the First Sin",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={"h-full antialiased"}>
            <body className="min-h-full flex flex-col">{children}</body>
        </html>
    );
}
