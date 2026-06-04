'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'shared/lib/i18n/i18n.navigation';
import { routing, type AppLocale } from 'shared/lib/i18n/i18n.routing';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
} from '@/shared/lib/shadcn/components/ui/select';

export function LocaleSwitcher() {
    const locale = useLocale() as AppLocale;
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations('app.locale');

    function handleLocaleChange(nextLocale: string) {
        router.replace(pathname, { locale: nextLocale as AppLocale });
    }

    return (
        <Select value={locale} onValueChange={handleLocaleChange}>
            <SelectTrigger className="min-w-[130px]">
                <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper" align="center">
                <SelectGroup>
                    {routing.locales.map((localeOption) => (
                        <SelectItem key={localeOption} value={localeOption}>
                            {t(localeOption)}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
