import type { ReactNode } from 'react';
import { AuthFormCard } from './auth-form-card';

interface ResetPasswordCardLayoutProps {
    title: string;
    description: string;
    children: ReactNode;
}

export function ResetPasswordCardLayout({
    title,
    description,
    children,
}: ResetPasswordCardLayoutProps) {
    return (
        <main className="flex min-h-svh items-center justify-center px-4">
            <div className="w-full max-w-md">
                <AuthFormCard title={title} description={description}>
                    {children}
                </AuthFormCard>
            </div>
        </main>
    );
}
