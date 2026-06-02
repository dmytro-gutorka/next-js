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

export const TASKS_PAGE_SIZE = 12;
