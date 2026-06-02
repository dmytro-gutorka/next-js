import Link from 'next/link';

import { Button } from '@/shared/lib/shadcn/components/ui/button';

import type { TasksQueryState } from '../../model/task.types';

type TasksPaginationProps = {
    queryState: TasksQueryState;
    page: number;
    totalPages: number;
};

export function TasksPagination({ queryState, page, totalPages }: TasksPaginationProps) {
    if (totalPages <= 1) return null;

    const canGoPrevious = page > 1;
    const canGoNext = page < totalPages;

    return (
        <nav className="flex items-center justify-center gap-2 pt-4" aria-label="Tasks pagination">
            <Button asChild variant="outline" disabled={!canGoPrevious}>
                <Link href={buildTasksHref(queryState, page - 1)} aria-disabled={!canGoPrevious}>
                    Previous
                </Link>
            </Button>

            <span className="px-3 text-sm text-muted-foreground">
                Page {page} of {totalPages}
            </span>

            <Button asChild variant="outline" disabled={!canGoNext}>
                <Link href={buildTasksHref(queryState, page + 1)} aria-disabled={!canGoNext}>
                    Next
                </Link>
            </Button>
        </nav>
    );
}

function buildTasksHref(queryState: TasksQueryState, page: number) {
    const searchParams = new URLSearchParams({
        ...queryState,
        page: String(page),
    });

    return `/tasks?${searchParams.toString()}`;
}
