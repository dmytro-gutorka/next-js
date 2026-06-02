import 'server-only';

import { serverHttpClient } from '@/shared/server/api/server-http-client';

import type { Task, TasksPageResponse, TasksQueryState } from '../model/task.types';
import { TASKS_PAGE_SIZE } from 'features/tasks/model/task.constants';

export async function getTasksPage(
    accessToken: string,
    queryState: TasksQueryState,
    limit = TASKS_PAGE_SIZE,
) {
    const response = await serverHttpClient.get<TasksPageResponse>('/tasks', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        params: {
            ...queryState,
            limit,
        },
    });

    return response.data;
}

export async function getTaskById(accessToken: string, taskId: string) {
    const response = await serverHttpClient.get<Task>(`/tasks/${taskId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return response.data;
}
