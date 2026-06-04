import 'server-only';

import { cookies } from 'next/headers';
import { AuthCookieName } from '@/shared/config/auth';
import type { SessionTokens } from '../model/auth.types';
import {
    getAccessTokenCookieOptions,
    getRefreshTokenCookieOptions,
} from 'shared/server/api/cookies';
import { requestBackendRefresh } from 'features/auth/server/backend-auth-session';

export async function getAccessTokenCookie() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(AuthCookieName.accessToken)?.value;

    if (accessToken) return accessToken;

    const refreshedSession = await refreshSessionCookies();

    return refreshedSession?.accessToken ?? null;
}

export async function getRefreshTokenCookie() {
    const cookieStore = await cookies();

    return cookieStore.get(AuthCookieName.refreshToken)?.value ?? null;
}

export async function setSessionCookies(session: SessionTokens) {
    const cookieStore = await cookies();

    cookieStore.set(
        AuthCookieName.accessToken,
        session.accessToken,
        getAccessTokenCookieOptions(),
    );
    cookieStore.set(
        AuthCookieName.refreshToken,
        session.refreshToken,
        getRefreshTokenCookieOptions(),
    );
}

export async function clearSessionCookies() {
    const cookieStore = await cookies();

    cookieStore.delete(AuthCookieName.accessToken);
    cookieStore.delete(AuthCookieName.refreshToken);
}

export async function refreshSessionCookies() {
    const refreshToken = await getRefreshTokenCookie();

    if (!refreshToken) return null;

    const refreshedSession = await requestBackendRefresh(refreshToken);

    if (!refreshedSession) {
        await safelyClearSessionCookies();
        return null;
    }

    await safelySetSessionCookies(refreshedSession);

    return refreshedSession;
}

async function safelySetSessionCookies(session: SessionTokens) {
    try {
        await setSessionCookies(session);
    } catch (_error) {
        // During Server Component rendering Next.js may not allow mutating cookies.
        // Returning the fresh access token is still useful for retrying the current backend request.
    }
}

async function safelyClearSessionCookies() {
    try {
        await clearSessionCookies();
    } catch (_error) {
        // Same reason as above: cookie mutation is not always available in every server context.
    }
}
