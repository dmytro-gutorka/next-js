'use server';

import { UpdatePrimaryEmailSchema } from '../model/auth.schemas';
import type { ActionState, UpdatePrimaryEmailPayload } from '../model/auth.types';
import { updatePrimaryEmail } from '../server/auth-api';
import { getAccessTokenCookie } from '../server/session-cookies';
import {
    createErrorActionState,
    createValidationActionState,
} from 'shared/lib/server-actions/action-state';
import { revalidatePath } from 'next/cache';
import { AppRoutes } from 'shared/config/app-routes';

export async function updatePrimaryEmailAction(
    payload: UpdatePrimaryEmailPayload,
): Promise<ActionState> {
    const accessToken = await getAccessTokenCookie();

    if (!accessToken) {
        return {
            success: false,
            message: 'Authentication is required.',
        };
    }

    const parsedEmail = UpdatePrimaryEmailSchema.safeParse(payload);

    if (!parsedEmail.success) return createValidationActionState(parsedEmail);

    try {
        const response = await updatePrimaryEmail(accessToken, parsedEmail.data);

        revalidatePath(AppRoutes.profileDetails);
        return {
            success: true,
            message: response.message,
        };
    } catch (error) {
        return createErrorActionState(error);
    }
}
