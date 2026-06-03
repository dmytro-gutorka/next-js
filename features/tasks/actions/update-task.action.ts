'use server';

import { revalidatePath } from 'next/cache';
import { getAccessTokenCookie } from '@/features/auth/server/session-cookies';
import { AppRoutes } from '@/shared/config/app-routes';
import { TaskFormSchema } from '../model/task.schemas';
import { updateTask } from '../server/tasks-api';
import {
    createErrorActionState,
    createValidationActionState,
} from 'shared/lib/server-actions/action-state';
import type { TaskFormValues } from 'features/tasks/model/task.types';

export async function updateTaskAction(taskId: string, payload: TaskFormValues) {
    const accessToken = await getAccessTokenCookie();

    if (!accessToken) {
        return {
            success: false,
            message: 'Authentication is required.',
        };
    }

    const parsedPayload = TaskFormSchema.safeParse(payload);

    if (!parsedPayload.success) return createValidationActionState(parsedPayload);

    try {
        await updateTask(accessToken, taskId, parsedPayload.data);

        revalidatePath(AppRoutes.tasks);
        revalidatePath(AppRoutes.taskDetails(taskId));

        return {
            success: true,
            message: 'Task was successfully updated.',
        };
    } catch (error) {
        return createErrorActionState(error);
    }
}
