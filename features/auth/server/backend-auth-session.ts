import type { SessionTokens, TokenResponse } from '../model/auth.types';

const REFRESH_TOKEN_COOKIE_NAME = 'refresh_token';

type SetCookieHeader = string | string[] | undefined;

export function getRefreshTokenFromSetCookieHeader(setCookieHeader: SetCookieHeader) {
    const cookies = Array.isArray(setCookieHeader)
        ? setCookieHeader
        : splitSetCookieHeader(setCookieHeader);

    const refreshCookie = cookies.find((cookie) =>
        cookie.trim().startsWith(`${REFRESH_TOKEN_COOKIE_NAME}=`),
    );

    if (!refreshCookie) return null;

    const [nameAndValue] = refreshCookie.trim().split(';');
    const [, refreshToken] = nameAndValue.split('=');

    return refreshToken ? decodeURIComponent(refreshToken) : null;
}

export function getSessionTokensFromBackendResponse(
    data: TokenResponse,
    setCookieHeader: SetCookieHeader,
): SessionTokens {
    const refreshToken = getRefreshTokenFromSetCookieHeader(setCookieHeader);

    if (!refreshToken) {
        throw new Error('Backend did not return refresh token cookie.');
    }

    return {
        accessToken: data.accessToken,
        refreshToken,
    };
}

export async function requestBackendRefresh(refreshToken: string): Promise<SessionTokens | null> {
    const baseUrl = process.env.NEXT_BACKEND_API_URL;

    if (!baseUrl) {
        throw new Error('NEXT_BACKEND_API_URL is required.');
    }

    try {
        const response = await fetch(`${baseUrl.replace(/\/$/, '')}/auth/refresh`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Cookie: `${REFRESH_TOKEN_COOKIE_NAME}=${encodeURIComponent(refreshToken)}`,
            },
            cache: 'no-store',
        });

        if (!response.ok) return null;

        const data = (await response.json()) as Partial<TokenResponse>;
        const nextRefreshToken = getRefreshTokenFromSetCookieHeader(
            response.headers.get('set-cookie') ?? undefined,
        );

        if (typeof data.accessToken !== 'string' || !nextRefreshToken) return null;

        return {
            accessToken: data.accessToken,
            refreshToken: nextRefreshToken,
        };
    } catch (_error) {
        return null;
    }
}

function splitSetCookieHeader(setCookieHeader?: string) {
    if (!setCookieHeader) return [];

    return setCookieHeader.split(/,(?=\s*[^;,]+=)/);
}
