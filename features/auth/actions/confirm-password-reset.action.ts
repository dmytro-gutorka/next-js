'use server';

import { ConfirmPasswordResetSchema } from '../model/auth.schemas';
import type { ActionState, ConfirmPasswordResetPayload } from '../model/auth.types';
import { confirmPasswordReset } from '../server/auth-api';
import {
    createErrorActionState,
    createValidationActionState,
} from 'shared/lib/server-actions/action-state';

export async function confirmPasswordResetAction(
    payload: ConfirmPasswordResetPayload,
): Promise<ActionState> {
    const parsedPayload = ConfirmPasswordResetSchema.safeParse(payload);

    if (!parsedPayload.success) return createValidationActionState(parsedPayload);

    try {
        const response = await confirmPasswordReset(parsedPayload.data);

        return {
            success: true,
            message: response.message,
        };
    } catch (error) {
        return createErrorActionState(error);
    }
}
