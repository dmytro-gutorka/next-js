'use server';

import { requireAuth } from '../require-auth';
import { getAccessTokenCookie } from '../session-cookies';
import { requestPasswordReset } from '../auth-api';
import { createErrorActionState } from './action-state';
import type { AuthActionState } from '../../model/auth.types';

export async function requestPasswordResetAction(): Promise<AuthActionState> {
    await requireAuth();

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
