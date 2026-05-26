import { cookies } from 'next/headers';
import { AuthCookieName } from '@/shared/config/auth';
import type { SessionTokens } from '@/features/auth/model/auth.types';
import {
    getAccessTokenCookieOptions,
    getRefreshTokenCookieOptions,
} from '@/shared/lib/auth/cookie-options';

export async function getAccessTokenCookie() {
    const cookieStore = await cookies();

    return cookieStore.get(AuthCookieName.accessToken)?.value ?? null;
}

export async function getRefreshTokenCookie() {
    const cookieStore = await cookies();

    return cookieStore.get(AuthCookieName.refreshToken)?.value ?? null;
}

export async function setSessionCookies({ accessToken, refreshToken }: SessionTokens) {
    const cookieStore = await cookies();

    cookieStore.set(AuthCookieName.accessToken, accessToken, getAccessTokenCookieOptions());

    if (refreshToken) {
        cookieStore.set(AuthCookieName.refreshToken, refreshToken, getRefreshTokenCookieOptions());
    }
}

export async function clearSessionCookies() {
    const cookieStore = await cookies();

    cookieStore.delete(AuthCookieName.accessToken);
    cookieStore.delete(AuthCookieName.refreshToken);
}
