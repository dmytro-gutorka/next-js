'use server';

import { redirect } from 'next/navigation';

import { AppRoutes } from '@/shared/config/routes';

import { signOut } from '../auth-api';
import { clearSessionCookies, getRefreshTokenCookie } from '../session-cookies';

export async function logoutAction() {
    const refreshToken = await getRefreshTokenCookie();

    if (refreshToken) await signOut(refreshToken).catch(() => null);

    await clearSessionCookies();
    redirect(AppRoutes.login);
}
