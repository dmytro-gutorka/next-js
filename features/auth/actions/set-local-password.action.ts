'use server';

import { SetLocalPasswordSchema } from '../model/auth.schemas';
import type { AuthActionState } from '../model/auth.types';
import { setLocalPassword } from '../server/auth-api';
import { getAccessTokenCookie } from '../server/session-cookies';
import {
    createErrorActionState,
    createValidationActionState,
    getStringFormValue,
} from 'shared/lib/server-actions/action-state';

export async function setLocalPasswordAction(
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

    const payload = SetLocalPasswordSchema.safeParse({
        password: getStringFormValue(formData, 'password'),
        confirmPassword: getStringFormValue(formData, 'confirmPassword'),
    });

    if (!payload.success) return createValidationActionState(payload);

    try {
        const response = await setLocalPassword(accessToken, payload.data);

        return {
            success: true,
            message: response.message,
        };
    } catch (error) {
        return createErrorActionState(error);
    }
}
