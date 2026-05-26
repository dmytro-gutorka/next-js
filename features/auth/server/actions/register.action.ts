'use server';

import { redirect } from 'next/navigation';

import { AppRoutes } from '@/shared/config/routes';

import { SignUpLocalSchema } from '../../model/auth.schemas';
import type { AuthActionState } from '../../model/auth.types';
import { signUpLocal } from '../auth-api';
import { setSessionCookies } from '../session-cookies';
import {
    createErrorActionState,
    createValidationActionState,
    getStringFormValue,
} from './action-state';

export async function registerAction(
    _previousState: AuthActionState,
    formData: FormData,
): Promise<AuthActionState> {
    const payload = SignUpLocalSchema.safeParse({
        email: getStringFormValue(formData, 'email'),
        password: getStringFormValue(formData, 'password'),
    });

    if (!payload.success) return createValidationActionState(payload);

    try {
        const tokens = await signUpLocal(payload.data);
        await setSessionCookies(tokens);
    } catch (error) {
        return createErrorActionState(error);
    }

    redirect(AppRoutes.tasks);
}
