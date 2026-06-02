import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { AppRoutes } from '@/shared/config/app-routes';
import { Button } from '@/shared/lib/shadcn/components/ui/button';

export function TaskDetailsHeader() {
    return (
        <div className="flex items-center justify-between gap-4">
            <Button asChild variant="ghost">
                <Link href={AppRoutes.tasks}>
                    <ArrowLeft className="mr-2 size-4" />
                    Back to tasks
                </Link>
            </Button>
        </div>
    );
}
