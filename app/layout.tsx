import './assets/styles/globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import { RootProviders } from '@/shared/providers/root-providers';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Task Management Board',
    description: 'Task management application',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
            suppressHydrationWarning={true}
        >
            <body className="min-h-full flex flex-col">
                <RootProviders>{children}</RootProviders>
            </body>
        </html>
    );
}
