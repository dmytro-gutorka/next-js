'use server';

import { redirect } from 'next/navigation';
import { AppRoutes } from 'shared/config/app-routes';
import { SignInLocalSchema } from '../model/auth.schemas';
import type { ActionState, SignInLocalPayload } from '../model/auth.types';
import { signInLocal } from '../server/auth-api';
import { setSessionCookies } from '../server/session-cookies';
import {
    createErrorActionState,
    createValidationActionState,
} from 'shared/lib/server-actions/action-state';

export async function loginAction(payload: SignInLocalPayload): Promise<ActionState> {
    const parsedPayload = SignInLocalSchema.safeParse(payload);

    if (!parsedPayload.success) return createValidationActionState(parsedPayload);

    try {
        const tokens = await signInLocal(parsedPayload.data);

        await setSessionCookies(tokens);
    } catch (error) {
        return createErrorActionState(error);
    }

    redirect(AppRoutes.tasks);
}
