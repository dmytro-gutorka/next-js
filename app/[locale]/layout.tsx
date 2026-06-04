import type { ReactNode } from 'react';
import { routing } from 'shared/lib/i18n/i18n.routing';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

interface LocaleLayoutProps {
    children: ReactNode;
    params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) notFound();

    return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
