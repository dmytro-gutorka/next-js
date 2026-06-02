'use server';

import { UpdatePrimaryEmailSchema } from '../model/auth.schemas';
import type { AuthActionState } from '../model/auth.types';
import { updatePrimaryEmail } from '../server/auth-api';
import { getAccessTokenCookie } from '../server/session-cookies';
import {
    createErrorActionState,
    createValidationActionState,
    getStringFormValue,
} from 'shared/lib/server-actions/action-state';

export async function updatePrimaryEmailAction(
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

    const payload = UpdatePrimaryEmailSchema.safeParse({
        email: getStringFormValue(formData, 'email'),
    });

    if (!payload.success) return createValidationActionState(payload);

    try {
        const response = await updatePrimaryEmail(accessToken, payload.data);

        return {
            success: true,
            message: response.message,
        };
    } catch (error) {
        return createErrorActionState(error);
    }
}
