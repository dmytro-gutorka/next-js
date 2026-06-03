import { CheckCircle2, Circle, Clock3, type LucideIcon } from 'lucide-react';

import { TASK_PRIORITY, TASK_STATUS } from './task.constants';
import type { TaskPriority, TaskStatus } from './task.types';

type TaskStatusConfig = Record<
    TaskStatus,
    {
        label: string;
        icon: LucideIcon;
        className: string;
        iconClassName: string;
    }
>;

type TaskPriorityConfig = Record<
    TaskPriority,
    {
        label: string;
        className: string;
    }
>;

export const taskStatusConfig = {
    [TASK_STATUS.TODO]: {
        label: 'Todo',
        icon: Circle,
        className: 'border-transparent bg-muted text-muted-foreground',
        iconClassName: 'text-muted-foreground',
    },
    [TASK_STATUS.IN_PROGRESS]: {
        label: 'In progress',
        icon: Clock3,
        className:
            'border-transparent bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
        iconClassName: 'text-blue-600',
    },
    [TASK_STATUS.DONE]: {
        label: 'Done',
        icon: CheckCircle2,
        className:
            'border-transparent bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',
        iconClassName: 'text-green-600',
    },
} satisfies TaskStatusConfig;

export const taskPriorityConfig = {
    [TASK_PRIORITY.LOW]: {
        label: 'Low',
        className:
            'border-transparent bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300',
    },
    [TASK_PRIORITY.MEDIUM]: {
        label: 'Medium',
        className:
            'border-transparent bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
    },
    [TASK_PRIORITY.HIGH]: {
        label: 'High',
        className: 'border-transparent bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
    },
} satisfies TaskPriorityConfig;
