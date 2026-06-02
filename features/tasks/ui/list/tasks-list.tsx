import { Calendar, Lock } from 'lucide-react';

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

interface TasksListProps {
    tasks: Task[];
}

export function TasksList({ tasks }: TasksListProps) {
    if (!tasks.length) return <TasksEmptyState />;

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
        </div>
    );
}
