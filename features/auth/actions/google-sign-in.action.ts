'use server';

import type { AuthActionState } from '../model/auth.types';
import { redirect } from 'next/navigation';
import { SignInGoogleSchema } from '../model/auth.schemas';
import { signInGoogle } from '../server/auth-api';
import { setSessionCookies } from '../server/session-cookies';
import {
    createErrorActionState,
    createValidationActionState,
    getStringFormValue,
} from 'shared/lib/server-actions/action-state';
import { AppRoutes } from 'shared/config/app-routes';

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
