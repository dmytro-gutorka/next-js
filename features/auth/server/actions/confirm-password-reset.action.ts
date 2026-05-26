'use server';

import { ConfirmPasswordResetSchema } from '../../model/auth.schemas';
import type { AuthActionState } from '../../model/auth.types';
import { confirmPasswordReset } from '../auth-api';
import {
    createErrorActionState,
    createValidationActionState,
    getStringFormValue,
} from './action-state';

export async function confirmPasswordResetAction(
    _previousState: AuthActionState,
    formData: FormData,
): Promise<AuthActionState> {
    const payload = ConfirmPasswordResetSchema.safeParse({
        token: getStringFormValue(formData, 'token'),
        newPassword: getStringFormValue(formData, 'newPassword'),
        confirmPassword: getStringFormValue(formData, 'confirmPassword'),
    });

    if (!payload.success) return createValidationActionState(payload);

    try {
        const response = await confirmPasswordReset(payload.data);

        return {
            success: true,
            message: response.message,
        };
    } catch (error) {
        return createErrorActionState(error);
    }
}
