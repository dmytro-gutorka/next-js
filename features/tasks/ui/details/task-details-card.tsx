import type { Task } from '../../model/task.types';
import { Calendar, Clock, Lock } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/shared/lib/shadcn/components/ui/card';
import { formatTaskDate } from '../../model/task.helpers';
import { TaskBadge } from '../common/task-badge';
import { TaskPriorityBadge } from '../common/task-priority-badge';
import { TaskStatusBadge } from '../common/task-status-badge';
import { TaskMetadataCard } from 'features/tasks/ui/common/task-meta-data-card';

interface TaskDetailsCardProps {
    task: Task;
}

export function TaskDetailsCard({ task }: TaskDetailsCardProps) {
    return (
        <Card>
            <CardHeader className="space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0 space-y-3">
                        <CardTitle className="text-2xl leading-tight">{task.title}</CardTitle>
                        <CardDescription>Task details and read-only metadata.</CardDescription>

                        <div className="flex flex-wrap gap-2">
                            <TaskStatusBadge status={task.status} />
                            <TaskPriorityBadge priority={task.priority} />
                            {task.isPrivate && (
                                <TaskBadge>
                                    <Lock className="size-3.5" />
                                    Private
                                </TaskBadge>
                            )}
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                <section className="space-y-2">
                    <h2 className="text-sm font-medium text-muted-foreground">Description</h2>
                    <p className="whitespace-pre-wrap text-sm leading-7 text-foreground">
                        {task.description || 'No description'}
                    </p>
                </section>

                <div className="grid gap-4 md:grid-cols-3">
                    <TaskMetadataCard
                        icon={<Calendar className="size-4" />}
                        label="Deadline"
                        value={formatTaskDate(task.deadline || '', 'no deadline')}
                    />
                    <TaskMetadataCard
                        icon={<Clock className="size-4" />}
                        label="Created"
                        value={formatTaskDate(task.createdAt)}
                    />
                    <TaskMetadataCard
                        icon={<Clock className="size-4" />}
                        label="Updated"
                        value={formatTaskDate(task.updatedAt)}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
