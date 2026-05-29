import type { AuthActionState } from '../model/auth.types';
import type { ZodSafeParseError } from 'zod';
import { z } from 'zod';
import { getServerHttpErrorMessage } from 'shared/lib/api/http-error-helpers';

export const initialAuthActionState: AuthActionState = {
    success: false,
};

export function createValidationActionState(payload: ZodSafeParseError<unknown>): AuthActionState {
    const { fieldErrors } = z.flattenError(payload.error);

    return {
        success: false,
        message: 'Please check the form fields.',
        fieldErrors,
    };
}

export function createErrorActionState(error: unknown): AuthActionState {
    return {
        success: false,
        message: getServerHttpErrorMessage(error),
    };
}

export function getStringFormValue(formData: FormData, name: string) {
    const value = formData.get(name);

    return typeof value === 'string' ? value : '';
}
