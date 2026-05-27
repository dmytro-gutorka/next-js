import 'server-only';

import { DEFAULT_ACCESS_TOKEN_TTL_SECONDS } from 'shared/config/auth';

export function getAccessTokenCookieOptions() {
    return {
        httpOnly: true,
        sameSite: 'lax' as const,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: Number(
            process.env.NEXT_AUTH_ACCESS_TOKEN_TTL_SECONDS ?? DEFAULT_ACCESS_TOKEN_TTL_SECONDS,
        ),
    };
}
