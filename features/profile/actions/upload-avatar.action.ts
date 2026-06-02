'use server';

import { revalidatePath } from 'next/cache';

import { createErrorActionState } from 'shared/lib/server-actions/action-state';
import { getAccessTokenCookie } from '@/features/auth/server/session-cookies';
import { uploadAvatar } from '@/features/user/index.server';
import { AppRoutes } from '@/shared/config/app-routes';

import type { ProfileActionState } from '../model/profile.types';

const ALLOWED_AVATAR_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_AVATAR_SIZE_BYTES = 5 * 1024 * 1024;

export async function uploadAvatarAction(formData: FormData): Promise<ProfileActionState> {
    const accessToken = await getAccessTokenCookie();

    if (!accessToken) {
        return {
            success: false,
            message: 'Authentication is required.',
        };
    }

    const avatar = formData.get('avatar');
    const validationError = validateAvatarFile(avatar);

    if (validationError) {
        return {
            success: false,
            message: validationError,
            fieldErrors: {
                avatar: [validationError],
            },
        };
    }

    try {
        await uploadAvatar(accessToken, formData);
        revalidatePath(AppRoutes.profileDetails);

        return {
            success: true,
            message: 'Avatar was successfully updated.',
        };
    } catch (error) {
        return createErrorActionState(error);
    }
}

function validateAvatarFile(file: FormDataEntryValue | null) {
    if (!(file instanceof File) || file.size === 0) {
        return 'Please select an avatar image.';
    }

    if (!ALLOWED_AVATAR_TYPES.includes(file.type)) {
        return 'Avatar must be a JPEG, PNG or WebP image.';
    }

    if (file.size > MAX_AVATAR_SIZE_BYTES) {
        return 'Avatar must be smaller than 5MB.';
    }

    return null;
}
