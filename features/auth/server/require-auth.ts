import { redirect } from 'next/navigation';

import { AppRoutes } from '@/shared/config/routes';

import { getCurrentUser } from './get-current-user';

export async function requireAuth() {
    const currentUser = await getCurrentUser();

    if (!currentUser) redirect(AppRoutes.login);

    return currentUser;
}
