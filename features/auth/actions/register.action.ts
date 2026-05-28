'use server';

import { redirect } from 'next/navigation';
import { AppRoutes } from 'shared/config/app-routes';
import { SignUpFormSchema } from '../model/auth.schemas';
import type { AuthActionState } from '../model/auth.types';
import { signUpLocal } from '../server/auth-api';
import { setSessionCookies } from '../server/session-cookies';
import {
    createErrorActionState,
    createValidationActionState,
    getStringFormValue,
} from './action-state';

export async function registerAction(
    _previousState: AuthActionState,
    formData: FormData,
): Promise<AuthActionState> {
    const payload = SignUpFormSchema.safeParse({
        email: getStringFormValue(formData, 'email'),
        password: getStringFormValue(formData, 'password'),
        confirmPassword: getStringFormValue(formData, 'confirmPassword'),
    });

    if (!payload.success) return createValidationActionState(payload);

    try {
        const tokens = await signUpLocal({
            email: payload.data.email,
            password: payload.data.password,
        });
        await setSessionCookies(tokens);
    } catch (error) {
        return createErrorActionState(error);
    }

    redirect(AppRoutes.tasks);
}
