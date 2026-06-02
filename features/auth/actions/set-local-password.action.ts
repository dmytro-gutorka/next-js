'use server';

import { SetLocalPasswordSchema } from '../model/auth.schemas';
import type { ActionState, SetLocalPasswordPayload } from '../model/auth.types';
import { setLocalPassword } from '../server/auth-api';
import { getAccessTokenCookie } from '../server/session-cookies';
import {
    createErrorActionState,
    createValidationActionState,
} from 'shared/lib/server-actions/action-state';

export async function setLocalPasswordAction(
    payload: SetLocalPasswordPayload,
): Promise<ActionState> {
    const accessToken = await getAccessTokenCookie();

    if (!accessToken) {
        return {
            success: false,
            message: 'Authentication is required.',
        };
    }

    const parsedPayload = SetLocalPasswordSchema.safeParse(payload);

    if (!parsedPayload.success) return createValidationActionState(parsedPayload);

    try {
        const response = await setLocalPassword(accessToken, parsedPayload.data);

        return {
            success: true,
            message: response.message,
        };
    } catch (error) {
        return createErrorActionState(error);
    }
}
