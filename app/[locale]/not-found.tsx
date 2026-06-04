import { getTranslations } from 'next-intl/server';
import { AppRoutes } from 'shared/config/app-routes';
import { Link } from 'shared/lib/i18n/i18n.navigation';
import { Button } from 'shared/lib/shadcn/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from 'shared/lib/shadcn/components/ui/card';

export default async function NotFoundPage() {
    const t = await getTranslations('app.errors');

    return (
        <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <CardTitle>{t('notFoundTitle')}</CardTitle>
                    <CardDescription>{t('notFoundDescription')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href={AppRoutes.tasks}>{t('goHome')}</Link>
                    </Button>
                </CardContent>
            </Card>
        </main>
    );
}
