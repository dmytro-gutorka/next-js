export function matchesRoutePrefix(pathname: string, route: string) {
    return pathname === route || pathname.startsWith(`${route}/`);
}
