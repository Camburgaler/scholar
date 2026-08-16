import "@/app/globals.css";
import type { Metadata } from "next";
import { version } from "../package.json";

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
        <html lang="en" className="h-full antialiased box-border">
            <body className="min-h-full flex flex-col">
                {children}
                <footer className="flex justify-between items-end mt-auto p-4">
                    <span className="flex flex-col">
                        <p>v{version}</p>
                        <p>
                            Inspired by{" "}
                            <a
                                href="https://www.mugenmonkey.com/darksouls2"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
                                MugenMonkey
                            </a>
                        </p>
                    </span>
                    <span className="flex flex-col text-right">
                        <p>
                            ©2026{" "}
                            <a
                                href="https://github.com/Camburgaler"
                                className="underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Camburgaler
                            </a>
                        </p>
                        <p>
                            Have suggestions? Submit a{" "}
                            <a
                                href="https://github.com/Camburgaler/scholar/issues/new?template=feature_request.md"
                                className="underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                feature request
                            </a>{" "}
                            or a{" "}
                            <a
                                href="https://github.com/Camburgaler/scholar/issues/new?template=bug_report.md"
                                className="underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                bug report
                            </a>
                            !
                        </p>
                    </span>
                </footer>
            </body>
        </html>
    );
}
