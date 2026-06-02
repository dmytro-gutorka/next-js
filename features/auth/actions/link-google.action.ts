'use server';

import type { ActionState, SignInGooglePayload } from '../model/auth.types';
import { SignInGoogleSchema } from '../model/auth.schemas';
import { linkGoogle } from '../server/auth-api';
import { getAccessTokenCookie } from '../server/session-cookies';
import {
    createErrorActionState,
    createValidationActionState,
} from 'shared/lib/server-actions/action-state';

export async function linkGoogleAction(payload: SignInGooglePayload): Promise<ActionState> {
    const accessToken = await getAccessTokenCookie();

    if (!accessToken) {
        return {
            success: false,
            message: 'Authentication is required.',
        };
    }

    const parsedPayload = SignInGoogleSchema.safeParse(payload);

    if (!parsedPayload.success) return createValidationActionState(parsedPayload);

    try {
        const response = await linkGoogle(accessToken, parsedPayload.data);

        return {
            success: true,
            message: response.message,
        };
    } catch (error) {
        return createErrorActionState(error);
    }
}
