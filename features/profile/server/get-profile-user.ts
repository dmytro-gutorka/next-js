import 'server-only';

import { redirect } from 'next/navigation';
import { getAccessTokenCookie } from '@/features/auth/server/session-cookies';
import { getMe } from '@/features/user/index.server';
import { AppRoutes } from '@/shared/config/app-routes';
import { getServerHttpErrorStatus } from 'shared/server/api/http-error.helpers';

export async function getProfileUser() {
    const accessToken = await getAccessTokenCookie();

    if (!accessToken) redirect(AppRoutes.login);

    try {
        return await getMe(accessToken);
    } catch (error) {
        if (getServerHttpErrorStatus(error) === 401) redirect(AppRoutes.login);

        throw error;
    }
}
