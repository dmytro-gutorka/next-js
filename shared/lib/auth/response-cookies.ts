import { NextResponse } from 'next/server';
import type { RefreshedTokens } from '@/shared/lib/auth/types';
import { AuthCookieName } from '@/shared/config/auth';
import {
    getAccessTokenCookieOptions,
    getRefreshTokenCookieOptions,
} from '@/shared/lib/auth/cookie-options';

export function setSessionCookiesOnResponse(response: NextResponse, tokens: RefreshedTokens) {
    response.cookies.set(
        AuthCookieName.accessToken,
        tokens.accessToken,
        getAccessTokenCookieOptions(),
    );

    if (tokens.refreshToken) {
        response.cookies.set(
            AuthCookieName.refreshToken,
            tokens.refreshToken,
            getRefreshTokenCookieOptions(),
        );
    }
}

export function clearSessionCookiesOnResponse(response: NextResponse) {
    response.cookies.delete(AuthCookieName.accessToken);
    response.cookies.delete(AuthCookieName.refreshToken);
}
