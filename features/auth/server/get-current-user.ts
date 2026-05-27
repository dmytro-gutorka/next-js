import 'server-only';

import { getCurrentUser as getCurrentUserFromBackend } from './auth-api';
import { getAccessTokenCookie } from './session-cookies';
import { getServerHttpErrorStatus } from '@/shared/server/api/http-error.helpers';

export async function getCurrentUser() {
    const accessToken = await getAccessTokenCookie();

    if (!accessToken) return null;

    try {
        return await getCurrentUserFromBackend(accessToken);
    } catch (error) {
        if (getServerHttpErrorStatus(error) === 401) return null;

        throw error;
    }
}
