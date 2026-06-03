import { Calendar, Lock, Loader2 } from 'lucide-react';

import { AppRoutes } from '@/shared/config/app-routes';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/shared/lib/shadcn/components/ui/card';

import type { Task } from '../../model/task.types';
import { TaskBadge } from '../common/task-badge';
import { TaskPriorityBadge } from '../common/task-priority-badge';
import { TaskStatusBadge } from '../common/task-status-badge';
import { TasksEmptyState } from './tasks-empty-state';
import { TaskCardActions } from './task-card-actions';
import Link from 'next/link';
import { formatTaskDate } from 'features/tasks/model/task.helpers';
import type { RefObject } from 'react';

interface TasksListProps {
    tasks: Task[];
    isFirstPageLoading: boolean;
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    errorMessage: string | null;
    loadMoreRef: RefObject<HTMLDivElement | null>;
}

export function TasksList({
    tasks,
    isFirstPageLoading,
    isFetchingNextPage,
    hasNextPage,
    errorMessage,
    loadMoreRef,
}: TasksListProps) {
    if (isFirstPageLoading) {
        return (
            <div className="space-y-3">
                {Array.from({ length: 4 }, (_, index) => (
                    <div key={index} className="h-32 animate-pulse rounded-xl border bg-muted/30" />
                ))}
            </div>
        );
    }

    if (!tasks.length && !errorMessage) return <TasksEmptyState />;


    return (
        <div className="space-y-3">
            {tasks.map((task) => (
                <Card key={task.id} className="transition-colors hover:bg-muted/40">
                    <CardHeader className="gap-3 md:flex-row md:items-start md:justify-between">
                        <Link
                            href={AppRoutes.taskDetails(task.id)}
                            className="min-w-0 flex-1 space-y-2"
                        >
                            <CardTitle>{task.title}</CardTitle>
                            <CardDescription className="line-clamp-2">
                                {task.description || 'No description'}
                            </CardDescription>
                        </Link>
                        <TaskCardActions task={task} />
                    </CardHeader>
                    <CardContent className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <TaskStatusBadge status={task.status} />
                        <TaskPriorityBadge priority={task.priority} />
                        {task.isPrivate && (
                            <TaskBadge>
                                <Lock className="size-3.5" />
                                Private
                            </TaskBadge>
                        )}
                        <span className="flex items-center gap-2">
                            <Calendar className="size-4" />
                            {formatTaskDate(task.deadline || '', 'no deadline')}
                        </span>
                    </CardContent>
                </Card>
            ))}

            {errorMessage && <p className="text-center text-sm text-destructive">{errorMessage}</p>}

            <div ref={loadMoreRef} className="flex min-h-8 items-center justify-center py-2">
                {isFetchingNextPage && (
                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="size-4 animate-spin" />
                        Loading more tasks...
                    </p>
                )}
                {!isFetchingNextPage && hasNextPage && (
                    <p className="text-sm text-muted-foreground">Scroll to load more tasks</p>
                )}
            </div>
        </div>
    );
}


