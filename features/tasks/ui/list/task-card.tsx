import { Calendar, Lock } from 'lucide-react';
import Link from 'next/link';
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
import { formatTaskDate } from 'features/tasks/model/task.helpers';

interface TaskCardProps {
    task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
    return (
        <Link href={AppRoutes.taskDetails(task.id)} className="block h-full">
            <Card className="h-full transition-colors hover:bg-muted/40">
                <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 space-y-2">
                            <CardTitle className="line-clamp-2">{task.title}</CardTitle>
                            <CardDescription className="line-clamp-2">
                                {task.description || 'No description'}
                            </CardDescription>
                        </div>

                        {task.isPrivate && (
                            <TaskBadge>
                                <Lock className="size-3.5" />
                                Private
                            </TaskBadge>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        <TaskStatusBadge status={task.status} />
                        <TaskPriorityBadge priority={task.priority} />
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="size-4" />
                        <span>{formatTaskDate(task.deadline || '', 'no deadline')}</span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
