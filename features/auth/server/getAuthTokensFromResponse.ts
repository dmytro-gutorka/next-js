import type { TokenResponse, AuthTokensResult } from '@/features/auth/model/auth.types';
import { getCookieValueFromHeaders } from '@/shared/api/backend-cookies';
import { AuthCookieName } from '@/shared/config/auth';

export function getAuthTokensFromResponse(data: TokenResponse, headers: Headers): AuthTokensResult {
    return {
        accessToken: data.accessToken,
        refreshToken: getCookieValueFromHeaders(headers, AuthCookieName.refreshToken),
    };
}
