import { redirect } from 'next/navigation';

import { AppRoutes } from '@/shared/config/routes';

function ProfileRoutePage() {
    redirect(AppRoutes.profileDetails);
}

export default ProfileRoutePage;
