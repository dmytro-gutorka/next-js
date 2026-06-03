import 'server-only';

import { serverHttpClient } from '@/shared/server/api/server-http-client';
import type {
    Task,
    TasksPageResponse,
    TasksQueryState,
    CreateTaskPayload,
    UpdateTaskPayload,
    TasksCursorResponse,
} from '../model/task.types';
import { TASKS_PAGE_SIZE } from 'features/tasks/model/task.constants';
import { getAuthHeaders } from 'shared/lib/common/helpers/getAuthHeaders';
import type { CursorParams } from 'shared/types/common.types';

export async function getTasksPage(
    accessToken: string,
    queryState: TasksQueryState,
    limit = TASKS_PAGE_SIZE,
) {
    const response = await serverHttpClient.get<TasksPageResponse>('/tasks', {
        headers: getAuthHeaders(accessToken),
        params: {
            ...queryState,
            limit,
        },
    });

    return response.data;
}

export async function getTasksFeedPage(accessToken: string, params: Partial<CursorParams>) {
    const response = await serverHttpClient.get<TasksCursorResponse>('/tasks/feed', {
        headers: getAuthHeaders(accessToken),
        params,
    });

    return response.data;
}

export async function getTaskById(accessToken: string, taskId: string) {
    const response = await serverHttpClient.get<Task>(`/tasks/${taskId}`, {
        headers: getAuthHeaders(accessToken),
    });

    return response.data;
}

export async function createTask(accessToken: string, payload: CreateTaskPayload) {
    const response = await serverHttpClient.post<Task>('/tasks', payload, {
        headers: getAuthHeaders(accessToken),
    });

    return response.data;
}

export async function updateTask(accessToken: string, taskId: string, payload: UpdateTaskPayload) {
    const response = await serverHttpClient.patch<Task>(`/tasks/${taskId}`, payload, {
        headers: getAuthHeaders(accessToken),
    });

    return response.data;
}

export async function deleteTask(accessToken: string, taskId: string) {
    await serverHttpClient.delete(`/tasks/${taskId}`, {
        headers: getAuthHeaders(accessToken),
    });
}
