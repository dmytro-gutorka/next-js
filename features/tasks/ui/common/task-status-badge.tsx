import { taskStatusConfig } from '../../model/task.config';
import type { TaskStatus } from '../../model/task.types';
import { TaskBadge } from './task-badge';

interface TaskStatusBadgeProps {
    status: TaskStatus;
}

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
    const config = taskStatusConfig[status];
    const StatusIcon = config.icon;

    return (
        <TaskBadge className={config.className}>
            <StatusIcon className="size-3.5" />
            {config.label}
        </TaskBadge>
    );
}
