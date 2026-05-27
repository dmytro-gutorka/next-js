import 'server-only';

import { cookies } from 'next/headers';
import { AuthCookieName } from '@/shared/config/auth';
import { getAccessTokenCookieOptions } from 'features/auth/server/cookie-options';
import type { SessionTokens } from '../model/auth.types';

export async function getAccessTokenCookie() {
    const cookieStore = await cookies();

    return cookieStore.get(AuthCookieName.accessToken)?.value ?? null;
}

export async function setSessionCookies({ accessToken }: SessionTokens) {
    const cookieStore = await cookies();

    cookieStore.set(AuthCookieName.accessToken, accessToken, getAccessTokenCookieOptions());
}

export async function clearSessionCookies() {
    const cookieStore = await cookies();

    cookieStore.delete(AuthCookieName.accessToken);
}
