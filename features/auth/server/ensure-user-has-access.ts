import 'server-only';

import { redirect } from 'next/navigation';
import { AppRoutes } from 'shared/config/app-routes';
import { getCurrentUser } from './get-current-user';

export async function ensureUserHasAccess() {
    const currentUser = await getCurrentUser();

    if (!currentUser) redirect(AppRoutes.login);

    return currentUser;
}
