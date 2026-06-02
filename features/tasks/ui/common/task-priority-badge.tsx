import type { TaskPriority } from '../../model/task.types';
import { taskPriorityConfig } from '../../model/task.config';
import { Flag } from 'lucide-react';
import { TaskBadge } from './task-badge';

interface TaskPriorityBadgeProps {
    priority: TaskPriority;
}

export function TaskPriorityBadge({ priority }: TaskPriorityBadgeProps) {
    const config = taskPriorityConfig[priority];

    return (
        <TaskBadge className={config.className}>
            <Flag className="size-3.5" />
            {config.label}
        </TaskBadge>
    );
}
