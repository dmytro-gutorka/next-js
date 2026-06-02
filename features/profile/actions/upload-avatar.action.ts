'use server';

import { revalidatePath } from 'next/cache';

import { createErrorActionState } from 'shared/lib/server-actions/action-state';
import { getAccessTokenCookie } from '@/features/auth/server/session-cookies';
import { uploadAvatar } from '@/features/user/index.server';
import { AppRoutes } from '@/shared/config/app-routes';

import type { ProfileActionState } from '../model/profile.types';

const ALLOWED_AVATAR_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_AVATAR_SIZE_BYTES = 5 * 1024 * 1024;

export async function uploadAvatarAction(
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

    const avatar = formData.get('avatar');

    if (!(avatar instanceof File) || avatar.size === 0) {
        return {
            success: false,
            message: 'Please select an avatar image.',
            fieldErrors: {
                avatar: ['Please select an avatar image.'],
            },
        };
    }

    if (!ALLOWED_AVATAR_TYPES.includes(avatar.type)) {
        return {
            success: false,
            message: 'Avatar must be a JPEG, PNG or WebP image.',
            fieldErrors: {
                avatar: ['Avatar must be a JPEG, PNG or WebP image.'],
            },
        };
    }

    if (avatar.size > MAX_AVATAR_SIZE_BYTES) {
        return {
            success: false,
            message: 'Avatar must be smaller than 5MB.',
            fieldErrors: {
                avatar: ['Avatar must be smaller than 5MB.'],
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
