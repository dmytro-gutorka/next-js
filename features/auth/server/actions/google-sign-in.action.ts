'use server';

import { redirect } from 'next/navigation';
import { AppRoutes } from '@/shared/config/routes';

import { SignInGoogleSchema } from '../../model/auth.schemas';
import type { AuthActionState } from '../../model/auth.types';
import { signInGoogle } from '../auth-api';
import { setSessionCookies } from '../session-cookies';
import {
    createErrorActionState,
    createValidationActionState,
    getStringFormValue,
} from './action-state';

export async function googleSignInAction(
    _previousState: AuthActionState,
    formData: FormData,
): Promise<AuthActionState> {
    const payload = SignInGoogleSchema.safeParse({
        credential: getStringFormValue(formData, 'credential'),
    });

    if (!payload.success) {
        return createValidationActionState(payload);
    }

    try {
        const tokens = await signInGoogle(payload.data);
        await setSessionCookies(tokens);
    } catch (error) {
        return createErrorActionState(error);
    }

    redirect(AppRoutes.tasks);
}
