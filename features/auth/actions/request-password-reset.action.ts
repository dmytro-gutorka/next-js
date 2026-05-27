'use server';

import { insureUserHasAccess } from 'features/auth/server/insure-user-has-access';
import { getAccessTokenCookie } from '../server/session-cookies';
import { requestPasswordReset } from '../server/auth-api';
import { createErrorActionState } from './action-state';
import type { AuthActionState } from '../model/auth.types';

export async function requestPasswordResetAction(): Promise<AuthActionState> {
    await insureUserHasAccess();

    const accessToken = await getAccessTokenCookie();

    if (!accessToken) {
        return {
            success: false,
            message: 'Authentication is required.',
        };
    }

    try {
        const response = await requestPasswordReset(accessToken);

        return {
            success: true,
            message: response.message,
        };
    } catch (error) {
        return createErrorActionState(error);
    }
}
