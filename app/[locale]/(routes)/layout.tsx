import type { ReactNode } from 'react';
import { AppHeader } from 'app/_components/app-header';

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <>
            <AppHeader />
            {children}
        </>
    );
}
