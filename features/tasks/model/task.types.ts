import type { ValueOf } from '@/shared/types/common.types';
import { z } from 'zod';
import {
    TASK_PRIORITY,
    TASK_PRIORITY_FILTER,
    TASK_SORT_BY_FILTER,
    TASK_STATUS,
    TASK_STATUS_FILTER,
    TASKS_SEARCH_BY_PARAMS,
    TASK_VIEW_MODE,
} from './task.constants';
import type { TaskFormSchema } from 'features/tasks/model/task.schemas';

export type TaskStatus = ValueOf<typeof TASK_STATUS>;
export type TaskPriority = ValueOf<typeof TASK_PRIORITY>;
export type TaskStatusFilter = ValueOf<typeof TASK_STATUS_FILTER>;
export type TaskPriorityFilter = ValueOf<typeof TASK_PRIORITY_FILTER>;
export type TaskSortBy = ValueOf<typeof TASK_SORT_BY_FILTER>;
export type TaskSearchBy = ValueOf<typeof TASKS_SEARCH_BY_PARAMS>;
export type TaskViewMode = ValueOf<typeof TASK_VIEW_MODE>;

export type TaskPayload = z.output<typeof TaskFormSchema>;
export type CreateTaskPayload = TaskPayload;
export type UpdateTaskPayload = Partial<TaskPayload>;

export type TasksPageSearchParams = Partial<Record<keyof TasksQueryState, string | string[]>>;

export type TasksPageResponse = PagePaginationResponse<Task>;

export type TaskFormInput = z.input<typeof TaskFormSchema>;
export type TaskFormValues = z.output<typeof TaskFormSchema>;

export type Task = {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    deadline?: string | null;
    isPrivate: boolean;
    createdAt: string;
    updatedAt: string;
};

export type TasksQueryState = {
    page: string;
    search: string;
    status: TaskStatusFilter;
    priority: TaskPriorityFilter;
    sortBy: TaskSortBy;
    searchBy: TaskSearchBy;
};

export type PaginationParams = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};

export type PagePaginationResponse<TItem> = PaginationParams & {
    items: TItem[];
};
