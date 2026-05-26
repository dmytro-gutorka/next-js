import {
    DEFAULT_ACCESS_TOKEN_TTL_SECONDS,
    DEFAULT_REFRESH_TOKEN_TTL_SECONDS,
} from '@/shared/config/auth';

export function getAccessTokenCookieOptions() {
    return {
        httpOnly: true,
        sameSite: 'lax' as const,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: getAccessTokenTtlSeconds(),
    };
}

export function getRefreshTokenCookieOptions() {
    return {
        httpOnly: true,
        sameSite: 'lax' as const,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: getRefreshTokenTtlSeconds(),
    };
}

export function getAccessTokenTtlSeconds() {
    return Number(
        process.env.NEXT_AUTH_ACCESS_TOKEN_TTL_SECONDS ?? DEFAULT_ACCESS_TOKEN_TTL_SECONDS,
    );
}

export function getRefreshTokenTtlSeconds() {
    return Number(
        process.env.NEXT_AUTH_REFRESH_TOKEN_TTL_SECONDS ?? DEFAULT_REFRESH_TOKEN_TTL_SECONDS,
    );
}
