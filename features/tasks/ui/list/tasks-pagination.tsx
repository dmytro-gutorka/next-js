'use client';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from 'shared/lib/shadcn/components/ui/pagination';
import type { TasksQueryState } from '../../model/task.types';
import { getTasksPageHref } from 'features/tasks/model/task.helpers';

interface TasksPaginationProps {
    queryState: TasksQueryState;
    page: number;
    totalPages: number;
}

export function TasksPagination({ queryState, page, totalPages }: TasksPaginationProps) {
    if (totalPages <= 1) return null;

    const canGoPrevious = page > 1;
    const canGoNext = page < totalPages;

    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    const visiblePages = pages.filter((pageNumber) => {
        return pageNumber === 1 || pageNumber === totalPages || Math.abs(pageNumber - page) <= 1;
    });

    return (
        <Pagination className="mt-6">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={canGoPrevious ? getTasksPageHref(queryState, page - 1) : '#'}
                        aria-disabled={!canGoPrevious}
                        className={!canGoPrevious ? 'pointer-events-none opacity-50' : undefined}
                    />
                </PaginationItem>

                {visiblePages.map((pageNumber, index) => {
                    const previousPage = visiblePages[index - 1];
                    const shouldShowEllipsis =
                        previousPage !== undefined && pageNumber - previousPage > 1;

                    return (
                        <div key={pageNumber} className="flex items-center">
                            {shouldShowEllipsis && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}

                            <PaginationItem>
                                <PaginationLink
                                    href={getTasksPageHref(queryState, pageNumber)}
                                    isActive={pageNumber === page}
                                    aria-current={pageNumber === page ? 'page' : undefined}
                                >
                                    {pageNumber}
                                </PaginationLink>
                            </PaginationItem>
                        </div>
                    );
                })}

                <PaginationItem>
                    <PaginationNext
                        href={canGoNext ? getTasksPageHref(queryState, page + 1) : '#'}
                        aria-disabled={!canGoNext}
                        className={!canGoNext ? 'pointer-events-none opacity-50' : undefined}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

