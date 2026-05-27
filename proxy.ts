import { NextResponse, type NextRequest } from 'next/server';
import { AppRoutes } from 'shared/config/app-routes';
import { protectedRoutePrefixes, publicOnlyRoutes } from '@/shared/config/proxy-routes';
import { AuthCookieName } from '@/shared/config/auth';
import { matchesRoutePrefix } from '@/shared/lib/auth/helpers';

export function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const accessToken = request.cookies.get(AuthCookieName.accessToken)?.value;

    const isPublicOnlyRoute = publicOnlyRoutes.includes(pathname);
    const isProtectedRoute = protectedRoutePrefixes.some((route) =>
        matchesRoutePrefix(pathname, route),
    );

    if (!isProtectedRoute && !isPublicOnlyRoute) return NextResponse.next();

    if (!accessToken && isProtectedRoute)
        return NextResponse.redirect(new URL(AppRoutes.login, request.url));

    if (accessToken && isPublicOnlyRoute)
        return NextResponse.redirect(new URL(AppRoutes.tasks, request.url));

    return NextResponse.next();
}

export const config = {
    matcher: ['/login', '/registration', '/reset-password', `/tasks/:path*`, `/profile/:path*`],
};
