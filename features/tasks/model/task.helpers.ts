import {
    TASK_PRIORITY_FILTER,
    TASK_SORT_BY_FILTER,
    TASK_STATUS_FILTER,
    TASKS_SEARCH_BY_PARAMS,
    TASK_PRIORITY,
    TASK_STATUS,
} from './task.constants';
import type { TasksPageSearchParams, TasksQueryState, Task, TaskFormInput } from './task.types';
import {
    normalizeEnumParam,
    normalizeStringParam,
} from 'shared/lib/common/helpers/normalizers.helpers';
import { AppRoutes } from 'shared/config/app-routes';

export function normalizeTasksSearchParams(searchParams: TasksPageSearchParams): TasksQueryState {
    return {
        page: normalizeStringParam(searchParams.page, '1'),
        search: normalizeStringParam(searchParams.search, ''),
        status: normalizeEnumParam(
            searchParams.status,
            Object.values(TASK_STATUS_FILTER),
            TASK_STATUS_FILTER.ALL,
        ),
        priority: normalizeEnumParam(
            searchParams.priority,
            Object.values(TASK_PRIORITY_FILTER),
            TASK_PRIORITY_FILTER.ALL,
        ),
        sortBy: normalizeEnumParam(
            searchParams.sortBy,
            Object.values(TASK_SORT_BY_FILTER),
            TASK_SORT_BY_FILTER.UPDATED_AT,
        ),
        searchBy: normalizeEnumParam(
            searchParams.searchBy,
            Object.values(TASKS_SEARCH_BY_PARAMS),
            TASKS_SEARCH_BY_PARAMS.TITLE,
        ),
    };
}

export function formatTaskDate(date: string, noDateMessage = 'No date') {
    if (!date) return noDateMessage;

    return new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
    }).format(new Date(date));
}

export function getTaskFormDefaultValues(task?: Task): TaskFormInput {
    return {
        title: task?.title ?? '',
        description: task?.description ?? '',
        status: task?.status ?? TASK_STATUS.TODO,
        priority: task?.priority ?? TASK_PRIORITY.MEDIUM,
        isPrivate: task?.isPrivate ?? false,
        deadline: task?.deadline ? task.deadline.slice(0, 10) : '',
    };
}

export function buildTasksQueryString(
    queryState: TasksQueryState,
    override: Partial<TasksQueryState>,
) {
    const nextQueryState = {
        ...queryState,
        ...override,
    };

    const params = new URLSearchParams();

    Object.entries(nextQueryState).forEach(([key, value]) => {
        if (!value) return;

        params.set(key, value);
    });

    return params.toString();
}

export function getTasksPageHref(queryState: TasksQueryState, page: number) {
    const searchParams = new URLSearchParams();

    Object.entries({ ...queryState, page: String(page) }).forEach(([key, value]) => {
        if (value) searchParams.set(key, value);
    });

    return `${AppRoutes.tasks}?${searchParams.toString()}`;
}
