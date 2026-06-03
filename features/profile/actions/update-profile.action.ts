'use server';

import { revalidatePath } from 'next/cache';
import {
    createErrorActionState,
    createValidationActionState,
} from 'shared/lib/server-actions/action-state';
import { getAccessTokenCookie } from '@/features/auth/server/session-cookies';
import { updateMe } from '@/features/user/index.server';
import { AppRoutes } from '@/shared/config/app-routes';
import { ProfileFormSchema } from '../model/profile.schemas';
import type { ProfileActionState, ProfileFormValues } from '../model/profile.types';

export async function updateProfileAction(payload: ProfileFormValues): Promise<ProfileActionState> {
    const accessToken = await getAccessTokenCookie();

    if (!accessToken) {
        return {
            success: false,
            message: 'Authentication is required.',
        };
    }

    const parsedPayload = ProfileFormSchema.safeParse(payload);

    if (!parsedPayload.success) return createValidationActionState(parsedPayload);

    try {
        await updateMe(accessToken, parsedPayload.data);

        revalidatePath(AppRoutes.profileDetails);

        return {
            success: true,
            message: 'Profile was successfully updated.',
        };
    } catch (error) {
        return createErrorActionState(error);
    }
}
