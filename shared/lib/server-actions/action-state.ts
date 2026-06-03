import type { ActionState } from 'features/auth/model/auth.types';
import type { ZodSafeParseError } from 'zod';
import { z } from 'zod';
import { getServerHttpErrorMessage } from 'shared/lib/api/http-error-helpers';

export const initialActionState = {
    success: false,
} satisfies ActionState;

export function createValidationActionState(payload: ZodSafeParseError<unknown>): ActionState {
    const { fieldErrors } = z.flattenError(payload.error);

    return {
        success: false,
        message: 'Please check the form fields.',
        fieldErrors,
    };
}

export function createErrorActionState(error: unknown): ActionState {
    return {
        success: false,
        message: getServerHttpErrorMessage(error),
    };
}
