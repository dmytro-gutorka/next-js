'use client';

import { useState, useRef, useCallback } from 'react';
import { TASK_VIEW_MODE } from '../../model/task.constants';
import type {
    Task,
    TasksQueryState,
    TaskViewMode,
    TasksCursorResponse,
    TasksPageResponse,
} from '../../model/task.types';
import { TasksGrid } from './tasks-grid';
import { TasksList } from './tasks-list';
import { TasksToolbar } from './tasks-toolbar';
import { useIntersectionObserver } from 'shared/hooks/useIntersectionObserver';
import type { CursorParams } from 'shared/types/common.types';
import { getTasksFeedPageAction } from 'features/tasks/actions/get-tasks-feed-page.action';
import { useCursorPagination } from 'shared/hooks/useCursorPagination';

interface TasksClientSectionProps {
    tasksPage: TasksPageResponse;
    queryState: TasksQueryState;
}

export function TasksClientSection({ tasksPage, queryState }: TasksClientSectionProps) {
    const [viewMode, setViewMode] = useState<TaskViewMode>(TASK_VIEW_MODE.GRID);
    const [listTasks, setListTasks] = useState<Task[]>([]);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const findFeedPageRequest = useCallback(async (params: Partial<CursorParams>) => {
        const result = await getTasksFeedPageAction(params);

        if (!result.success) throw new Error(result.message);

        return result.data;
    }, []);

    const { isFirstPageLoading, isFetchingNextPage, hasNextPage, errorMessage, fetchNextPage } =
        useCursorPagination<Task, TasksCursorResponse>(
            findFeedPageRequest,
            setListTasks,
            viewMode === TASK_VIEW_MODE.LIST,
        );

    const loadNextPage = useCallback(() => {
        if (!hasNextPage || isFetchingNextPage || isFirstPageLoading) return;

        void fetchNextPage();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage, isFirstPageLoading]);

    useIntersectionObserver({
        targetRef: loadMoreRef,
        enabled:
            viewMode === TASK_VIEW_MODE.LIST &&
            hasNextPage &&
            !isFetchingNextPage &&
            !isFirstPageLoading,
        onIntersect: loadNextPage,
    });

    return (
        <div className="space-y-6">
            <TasksToolbar
                queryState={queryState}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
            />

            {viewMode === TASK_VIEW_MODE.GRID ? (
                <TasksGrid tasksPage={tasksPage} queryState={queryState} />
            ) : (
                <TasksList
                    tasks={listTasks}
                    isFirstPageLoading={isFirstPageLoading}
                    isFetchingNextPage={isFetchingNextPage}
                    hasNextPage={hasNextPage}
                    errorMessage={errorMessage}
                    loadMoreRef={loadMoreRef}
                />
            )}
        </div>
    );
}
