'use server';

import { revalidatePath } from 'next/cache';
import {
    createErrorActionState,
    createValidationActionState,
    getStringFormValue,
} from 'shared/lib/server-actions/action-state';
import { getAccessTokenCookie } from '@/features/auth/server/session-cookies';
import { updateMe } from '@/features/user/index.server';
import { AppRoutes } from '@/shared/config/app-routes';
import { ProfileFormSchema } from '../model/profile.schemas';
import type { ProfileActionState } from '../model/profile.types';

export async function updateProfileAction(
    _previousState: ProfileActionState,
    formData: FormData,
): Promise<ProfileActionState> {
    const accessToken = await getAccessTokenCookie();

    if (!accessToken) {
        return {
            success: false,
            message: 'Authentication is required.',
        };
    }

    const payload = ProfileFormSchema.safeParse({
        name: getStringFormValue(formData, 'name'),
        surname: getStringFormValue(formData, 'surname'),
        birthday: getStringFormValue(formData, 'birthday'),
    });

    if (!payload.success) return createValidationActionState(payload);

    try {
        await updateMe(accessToken, payload.data);
        revalidatePath(AppRoutes.profileDetails);

        return {
            success: true,
            message: 'Profile was successfully updated.',
        };
    } catch (error) {
        return createErrorActionState(error);
    }
}
