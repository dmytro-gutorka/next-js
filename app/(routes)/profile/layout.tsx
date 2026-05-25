import type { ReactNode } from 'react';
import { ProfileLayout } from '@/features/profile/index.ui';

interface ProfileRouteLayoutProps {
    children: ReactNode;
}

function ProfileRouteLayout({ children }: ProfileRouteLayoutProps) {
    return <ProfileLayout>{children}</ProfileLayout>;
}

export default ProfileRouteLayout;
