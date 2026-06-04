import { NextResponse, type NextRequest } from 'next/server';
import { AppRoutes } from 'shared/config/app-routes';
import { protectedRoutePrefixes, publicOnlyRoutes } from '@/shared/config/proxy-routes';
import { AuthCookieName } from '@/shared/config/auth';
import { matchesRoutePrefix } from '@/shared/lib/auth/helpers';
import { routing } from 'shared/lib/i18n/i18n.routing';
import createMiddleware from 'next-intl/middleware';
import { getPathLocale, stripLocaleFromPathname } from 'shared/lib/i18n/i18n.helpers';
import {
    getAccessTokenCookieOptions,
    getRefreshTokenCookieOptions,
} from 'shared/server/api/cookies';
import { requestBackendRefresh } from 'features/auth/server/backend-auth-session';
import type { SessionTokens } from 'features/auth/model/auth.types';

const intlMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
    const locale = getPathLocale(request.nextUrl.pathname);

    if (!locale) return intlMiddleware(request);

    const pathname = stripLocaleFromPathname(request.nextUrl.pathname, locale);
    const accessToken = request.cookies.get(AuthCookieName.accessToken)?.value;
    const refreshToken = request.cookies.get(AuthCookieName.refreshToken)?.value;

    const isPublicOnlyRoute = publicOnlyRoutes.includes(pathname);
    const isProtectedRoute = protectedRoutePrefixes.some((route) =>
        matchesRoutePrefix(pathname, route),
    );

    if (!accessToken && refreshToken) {
        const refreshedSession = await requestBackendRefresh(refreshToken);

        if (refreshedSession) {
            const redirectUrl = isPublicOnlyRoute
                ? new URL(`/${locale}${AppRoutes.tasks}`, request.url)
                : request.nextUrl;
            const response = NextResponse.redirect(redirectUrl);

            setSessionCookies(response, refreshedSession);

            return response;
        }

        if (isProtectedRoute) {
            const response = NextResponse.redirect(
                new URL(`/${locale}${AppRoutes.login}`, request.url),
            );
            clearSessionCookies(response);

            return response;
        }
    }

    if (!accessToken && !refreshToken && isProtectedRoute) {
        return NextResponse.redirect(new URL(`/${locale}${AppRoutes.login}`, request.url));
    }

    if ((accessToken || refreshToken) && isPublicOnlyRoute) {
        return NextResponse.redirect(new URL(`/${locale}${AppRoutes.tasks}`, request.url));
    }

    return intlMiddleware(request);
}

function setSessionCookies(response: NextResponse, session: SessionTokens) {
    response.cookies.set(
        AuthCookieName.accessToken,
        session.accessToken,
        getAccessTokenCookieOptions(),
    );
    response.cookies.set(
        AuthCookieName.refreshToken,
        session.refreshToken,
        getRefreshTokenCookieOptions(),
    );
}

function clearSessionCookies(response: NextResponse) {
    response.cookies.delete(AuthCookieName.accessToken);
    response.cookies.delete(AuthCookieName.refreshToken);
}

export const config = {
    // Run proxy for all app pages so next-intl can handle locale routing.
    // Skip API routes, Next internals, Vercel internals, and static files.
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
