'use server';

import { revalidatePath } from 'next/cache';
import { getAccessTokenCookie } from '@/features/auth/server/session-cookies';
import { AppRoutes } from '@/shared/config/app-routes';
import type { TaskFormValues } from 'features/tasks/model/task.types';
import { TaskFormSchema } from 'features/tasks/model/task.schemas';
import { createTask } from 'features/tasks/server/tasks-api';
import {
    createErrorActionState,
    createValidationActionState,
} from 'shared/lib/server-actions/action-state';
import type { ActionState } from 'features/auth/model/auth.types';

export async function createTaskAction(payload: TaskFormValues): Promise<ActionState> {
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
        await createTask(accessToken, parsedPayload.data);
        revalidatePath(AppRoutes.tasks);

        return {
            success: true,
            message: 'Task was successfully created.',
        };
    } catch (error) {
        return createErrorActionState(error);
    }
}
