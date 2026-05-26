'use server';

import { redirect } from 'next/navigation';

import { AppRoutes } from '@/shared/config/routes';

import { SignInLocalSchema } from '../../model/auth.schemas';
import type { AuthActionState } from '../../model/auth.types';
import { signInLocal } from '../auth-api';
import { setSessionCookies } from '../session-cookies';
import {
    createErrorActionState,
    createValidationActionState,
    getStringFormValue,
} from './action-state';

export async function loginAction(
    _previousState: AuthActionState,
    formData: FormData,
): Promise<AuthActionState> {
    const payload = SignInLocalSchema.safeParse({
        email: getStringFormValue(formData, 'email'),
        password: getStringFormValue(formData, 'password'),
    });

    if (!payload.success) return createValidationActionState(payload);

    try {
        const tokens = await signInLocal(payload.data);
        await setSessionCookies(tokens);
    } catch (error) {
        return createErrorActionState(error);
    }

    redirect(AppRoutes.tasks);
}
