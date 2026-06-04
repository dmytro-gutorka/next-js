'use client';

import { AlertTriangle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from 'shared/lib/shadcn/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from 'shared/lib/shadcn/components/ui/card';

interface ErrorPageProps {
    reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
    const t = useTranslations('app.errors');

    return (
        <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                        <AlertTriangle className="size-6" />
                    </div>
                    <CardTitle>{t('title')}</CardTitle>
                    <CardDescription>{t('description')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button type="button" onClick={reset}>
                        {t('retry')}
                    </Button>
                </CardContent>
            </Card>
        </main>
    );
}
