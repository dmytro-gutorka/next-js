import {
    TASK_PRIORITY_FILTER,
    TASK_SORT_BY_FILTER,
    TASK_STATUS_FILTER,
    TASKS_SEARCH_BY_PARAMS,
} from './task.constants';
import type { TasksPageSearchParams, TasksQueryState } from './task.types';
import {
    normalizeEnumParam,
    normalizeStringParam,
} from 'shared/lib/common/helpers/normalizers.helpers';

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
