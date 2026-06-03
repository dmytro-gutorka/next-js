'use server';

import type { ActionState, SignInGooglePayload } from '../model/auth.types';
import { redirect } from 'next/navigation';
import { SignInGoogleSchema } from '../model/auth.schemas';
import { signInGoogle } from '../server/auth-api';
import { setSessionCookies } from '../server/session-cookies';
import {
    createErrorActionState,
    createValidationActionState,
} from 'shared/lib/server-actions/action-state';
import { AppRoutes } from 'shared/config/app-routes';

export async function googleSignInAction(payload: SignInGooglePayload): Promise<ActionState> {
    const parsedPayload = SignInGoogleSchema.safeParse(payload);

    if (!parsedPayload.success) {
        return createValidationActionState(parsedPayload);
    }

    try {
        const tokens = await signInGoogle(parsedPayload.data);
        await setSessionCookies(tokens);
    } catch (error) {
        return createErrorActionState(error);
    }

    redirect(AppRoutes.tasks);
}
