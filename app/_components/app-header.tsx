import { ClipboardList } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { LogoutButton } from 'features/auth/index.server';
import { AppRoutes } from 'shared/config/app-routes';
import { Link } from 'shared/lib/i18n/i18n.navigation';
import { Button } from 'shared/lib/shadcn/components/ui/button';
import { Separator } from 'shared/lib/shadcn/components/ui/separator';
import { LocaleSwitcher } from 'shared/ui/i18n/locale-switcher';
import { ThemeToggle } from 'shared/ui/theme/theme-toggle';
import { getAccessTokenCookie } from 'features/auth/server/session-cookies';

export async function AppHeader() {
    const isAuthenticated = await getAccessTokenCookie();
    const t = await getTranslations('app');

    return (
        <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
                <Link href={AppRoutes.tasks} className="flex items-center gap-2 font-semibold">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <ClipboardList className="size-5" />
                    </span>
                    <span className="hidden sm:inline">{t('name')}</span>
                </Link>

                <nav className="flex items-center gap-1">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={AppRoutes.tasks}>{t('navigation.tasks')}</Link>
                    </Button>
                    {isAuthenticated && (
                        <Button asChild variant="ghost" size="sm">
                            <Link href={AppRoutes.profileDetails}>{t('navigation.profile')}</Link>
                        </Button>
                    )}
                </nav>

                <div className="ml-auto flex items-center gap-2">
                    <LocaleSwitcher />
                    <ThemeToggle />
                    <Separator orientation="vertical" className="hidden h-6 sm:block" />

                    {isAuthenticated ? (
                        <LogoutButton />
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button asChild variant="ghost" size="sm">
                                <Link href={AppRoutes.login}>{t('navigation.login')}</Link>
                            </Button>
                            <Button asChild size="sm">
                                <Link href={AppRoutes.registration}>
                                    {t('navigation.registration')}
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
