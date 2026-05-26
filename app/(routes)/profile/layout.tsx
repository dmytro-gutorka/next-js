import type { ReactNode } from 'react';
import { ProfileLayout } from '@/features/profile/index.ui';
import { requireAuth } from '@/features/auth/index.server';

interface ProfileRouteLayoutProps {
    children: ReactNode;
}

async function ProfileRouteLayout({ children }: ProfileRouteLayoutProps) {
    await requireAuth();

    return <ProfileLayout>{children}</ProfileLayout>;
}

export default ProfileRouteLayout;
