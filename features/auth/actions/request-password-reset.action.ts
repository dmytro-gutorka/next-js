'use server';

import { getAccessTokenCookie } from '../server/session-cookies';
import { requestPasswordReset } from '../server/auth-api';
import { createErrorActionState } from 'shared/lib/server-actions/action-state';
import type { ActionState } from '../model/auth.types';

export async function requestPasswordResetAction(): Promise<ActionState> {
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
