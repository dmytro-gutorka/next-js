import type { ReactNode } from 'react';
import { ProfileLayout } from 'features/profile/ui/profile-layout';

interface ProfileRouteLayoutProps {
    children: ReactNode;
}

async function ProfileRouteLayout({ children }: ProfileRouteLayoutProps) {
    return <ProfileLayout>{children}</ProfileLayout>;
}

export default ProfileRouteLayout;
