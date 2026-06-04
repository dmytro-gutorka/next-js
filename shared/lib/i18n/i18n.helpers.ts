import { type AppLocale, routing } from 'shared/lib/i18n/i18n.routing';
import { AppRoutes } from 'shared/config/app-routes';

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export function getPathLocale(pathname: string): AppLocale | null {
    const segment = pathname.split('/')[1];

    return routing.locales.includes(segment as AppLocale) ? (segment as AppLocale) : null;
}

export function stripLocaleFromPathname(pathname: string, locale: AppLocale) {
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, '') || AppRoutes.home;

    return pathnameWithoutLocale.startsWith('/')
        ? pathnameWithoutLocale
        : `/${pathnameWithoutLocale}`;
}
