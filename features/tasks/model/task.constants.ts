export const TASK_STATUS = {
    TODO: 'todo',
    IN_PROGRESS: 'in-progress',
    DONE: 'done',
} as const;

export const TASK_PRIORITY = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
} as const;

export const TASK_STATUS_FILTER = {
    ...TASK_STATUS,
    ALL: 'all',
} as const;

export const TASK_PRIORITY_FILTER = {
    ...TASK_PRIORITY,
    ALL: 'all',
} as const;

export const TASK_SORT_BY_FILTER = {
    UPDATED_AT: 'updatedAt',
    CREATED_AT: 'createdAt',
    DEADLINE: 'deadline',
    TITLE: 'title',
} as const;

export const TASKS_SEARCH_BY_PARAMS = {
    TITLE: 'title',
    DESCRIPTION: 'description',
} as const;

export const TASK_VIEW_MODE = {
    GRID: 'grid',
    LIST: 'list',
} as const;

export const TASKS_PAGE_SIZE = 12;

export const TASK_STATUS_OPTIONS = [
    TASK_STATUS.TODO,
    TASK_STATUS.IN_PROGRESS,
    TASK_STATUS.DONE,
] as const;

export const TASK_PRIORITY_OPTIONS = [
    TASK_PRIORITY.LOW,
    TASK_PRIORITY.MEDIUM,
    TASK_PRIORITY.HIGH,
] as const;

export const TASK_STATUS_FILTER_OPTIONS = [
    TASK_STATUS_FILTER.ALL,
    TASK_STATUS_FILTER.TODO,
    TASK_STATUS_FILTER.IN_PROGRESS,
    TASK_STATUS_FILTER.DONE,
] as const;

export const TASK_PRIORITY_FILTER_OPTIONS = [
    TASK_PRIORITY_FILTER.ALL,
    TASK_PRIORITY_FILTER.LOW,
    TASK_PRIORITY_FILTER.MEDIUM,
    TASK_PRIORITY_FILTER.HIGH,
] as const;

export const TASK_SORT_BY_OPTIONS = [
    TASK_SORT_BY_FILTER.UPDATED_AT,
    TASK_SORT_BY_FILTER.CREATED_AT,
    TASK_SORT_BY_FILTER.DEADLINE,
    TASK_SORT_BY_FILTER.TITLE,
] as const;

export const TASK_SEARCH_BY_OPTIONS = [
    TASKS_SEARCH_BY_PARAMS.TITLE,
    TASKS_SEARCH_BY_PARAMS.DESCRIPTION,
] as const;
