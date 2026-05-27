import type { ReactNode } from 'react';
import Link from 'next/link';

import { AppRoutes } from 'shared/config/app-routes';

interface ProfileLayoutProps {
    children: ReactNode;
}

export function ProfileLayout({ children }: ProfileLayoutProps) {
    return (
        <main>
            <h1>Profile</h1>

            <nav>
                <Link href={AppRoutes.profileDetails}>Details</Link>
                <Link href={AppRoutes.profilePreferences}>Preferences</Link>
                <Link href={AppRoutes.profileSecurity}>Security</Link>
            </nav>

            {children}
        </main>
    );
}
