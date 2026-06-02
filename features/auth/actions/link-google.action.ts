'use server';

import { SignInGoogleSchema } from '../model/auth.schemas';
import type { AuthActionState } from '../model/auth.types';
import { linkGoogle } from '../server/auth-api';
import { getAccessTokenCookie } from '../server/session-cookies';
import {
    createErrorActionState,
    createValidationActionState,
    getStringFormValue,
} from 'shared/lib/server-actions/action-state';

export async function linkGoogleAction(
    _previousState: AuthActionState,
    formData: FormData,
): Promise<AuthActionState> {
    const accessToken = await getAccessTokenCookie();

    if (!accessToken) {
        return {
            success: false,
            message: 'Authentication is required.',
        };
    }

    const payload = SignInGoogleSchema.safeParse({
        credential: getStringFormValue(formData, 'credential'),
    });

    if (!payload.success) return createValidationActionState(payload);

    try {
        const response = await linkGoogle(accessToken, payload.data);

        return {
            success: true,
            message: response.message,
        };
    } catch (error) {
        return createErrorActionState(error);
    }
}
