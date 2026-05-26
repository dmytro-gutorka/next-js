import { NextResponse, type NextRequest } from 'next/server';
import { AppRoutes } from '@/shared/config/routes';
import { protectedRoutePrefixes, publicOnlyRoutes } from '@/shared/config/proxy-routes';
import { refreshTokensForProxy } from '@/shared/lib/auth/refresh-tokens-for-proxy';
import {
    clearSessionCookiesOnResponse,
    setSessionCookiesOnResponse,
} from '@/shared/lib/auth/response-cookies';
import { AuthCookieName } from '@/shared/config/auth';
import { matchesRoutePrefix } from '@/shared/lib/auth/helpers';

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const accessToken = request.cookies.get(AuthCookieName.accessToken)?.value;
    const refreshToken = request.cookies.get(AuthCookieName.refreshToken)?.value;
    const isProtectedRoute = protectedRoutePrefixes.some((route) =>
        matchesRoutePrefix(pathname, route),
    );
    const isPublicOnlyRoute = publicOnlyRoutes.includes(pathname);

    if (pathname === '/') return NextResponse.redirect(new URL(AppRoutes.tasks, request.url));

    if (!isProtectedRoute && !isPublicOnlyRoute) return NextResponse.next();

    if (accessToken) {
        if (isPublicOnlyRoute) return NextResponse.redirect(new URL(AppRoutes.tasks, request.url));

        return NextResponse.next();
    }

    if (!refreshToken) {
        if (isProtectedRoute) return NextResponse.redirect(new URL(AppRoutes.login, request.url));

        return NextResponse.next();
    }

    const refreshedTokens = await refreshTokensForProxy(refreshToken);

    if (!refreshedTokens) {
        const response = isProtectedRoute
            ? NextResponse.redirect(new URL(AppRoutes.login, request.url))
            : NextResponse.next();

        clearSessionCookiesOnResponse(response);
        return response;
    }

    const response = isPublicOnlyRoute
        ? NextResponse.redirect(new URL(AppRoutes.tasks, request.url))
        : NextResponse.next();

    setSessionCookiesOnResponse(response, refreshedTokens);
    return response;
}

export const config = {
    matcher: ['/login', '/registration', '/reset-password', `/tasks/:path*`, `/profile/:path*`],
};
