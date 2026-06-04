import {
    DEFAULT_ACCESS_TOKEN_TTL_SECONDS,
    DEFAULT_REFRESH_TOKEN_TTL_SECONDS,
} from 'shared/config/auth';

const BASE_COOKIE_OPTIONS = {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
};

export function getAccessTokenCookieOptions() {
    return {
        ...BASE_COOKIE_OPTIONS,
        maxAge: Number(
            process.env.NEXT_AUTH_ACCESS_TOKEN_TTL_SECONDS || DEFAULT_ACCESS_TOKEN_TTL_SECONDS,
        ),
    };
}

export function getRefreshTokenCookieOptions() {
    return {
        ...BASE_COOKIE_OPTIONS,
        maxAge: Number(
            process.env.NEXT_AUTH_REFRESH_TOKEN_TTL_SECONDS || DEFAULT_REFRESH_TOKEN_TTL_SECONDS,
        ),
    };
}
