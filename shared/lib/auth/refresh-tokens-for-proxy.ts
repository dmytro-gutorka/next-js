import { getCookieValueFromHeaders } from '@/shared/api/backend-cookies';
import type { RefreshedTokens } from '@/shared/lib/auth/types';
import { AuthCookieName } from '@/shared/config/auth';
import { getBackendUrl } from '@/shared/api/backend-url';

export async function refreshTokensForProxy(refreshToken: string): Promise<RefreshedTokens | null> {
    const baseUrl = process.env.BACKEND_API_URL;

    if (!baseUrl) return null;

    const response = await fetch(getBackendUrl(`/auth/refresh`), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Cookie: `${AuthCookieName.refreshToken}=${encodeURIComponent(refreshToken)}`,
        },
    }).catch(() => null);

    if (!response?.ok) return null;

    const data = (await response.json()) as { accessToken?: string };

    if (!data.accessToken) return null;

    return {
        accessToken: data.accessToken,
        refreshToken: getCookieValueFromHeaders(response.headers, AuthCookieName.refreshToken),
    };
}
