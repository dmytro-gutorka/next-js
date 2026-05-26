import { redirect } from 'next/navigation';

import { AppRoutes } from '@/shared/config/routes';

import { getCurrentUser } from './get-current-user';

export async function redirectIfAuthenticated() {
    const currentUser = await getCurrentUser();

    if (currentUser) redirect(AppRoutes.tasks);
}
