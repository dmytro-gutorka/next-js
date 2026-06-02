'use server';

import { redirect } from 'next/navigation';
import { AppRoutes } from 'shared/config/app-routes';
import { SignUpFormSchema } from '../model/auth.schemas';
import type { ActionState, SignUpLocalPayload } from '../model/auth.types';
import { signUpLocal } from '../server/auth-api';
import { setSessionCookies } from '../server/session-cookies';
import {
    createErrorActionState,
    createValidationActionState,
} from 'shared/lib/server-actions/action-state';

export async function registerAction(payload: SignUpLocalPayload): Promise<ActionState> {
    const parsedPayload = SignUpFormSchema.safeParse(payload);

    if (!parsedPayload.success) return createValidationActionState(parsedPayload);

    try {
        const tokens = await signUpLocal({
            email: parsedPayload.data.email,
            password: parsedPayload.data.password,
        });
        await setSessionCookies(tokens);
    } catch (error) {
        return createErrorActionState(error);
    }

    redirect(AppRoutes.tasks);
}
