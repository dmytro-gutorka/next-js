import { isBackendApiError } from '@/shared/api/backend-api-error';

import { getCurrentUser as getCurrentUserFromBackend } from './auth-api';
import { getAccessTokenCookie } from './session-cookies';

export async function getCurrentUser() {
    const accessToken = await getAccessTokenCookie();

    if (!accessToken) return null;

    try {
        return await getCurrentUserFromBackend(accessToken);
    } catch (error) {
        if (isBackendApiError(error) && error.statusCode === 401) return null;

        throw error;
    }
}
