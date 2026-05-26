export const AuthCookieName = {
    accessToken: 'access_token',
    refreshToken: 'refresh_token',
} as const;

export const DEFAULT_ACCESS_TOKEN_TTL_SECONDS = 60 * 15;
export const DEFAULT_REFRESH_TOKEN_TTL_SECONDS = 60 * 60 * 24;
