'use server';

import { revalidatePath } from 'next/cache';
import { getAccessTokenCookie } from '@/features/auth/server/session-cookies';
import { AppRoutes } from '@/shared/config/app-routes';
import { deleteTask } from '../server/tasks-api';
import { createErrorActionState } from 'shared/lib/server-actions/action-state';
import type { ActionState } from 'features/auth/model/auth.types';

export async function deleteTaskAction(taskId: string): Promise<ActionState> {
    const accessToken = await getAccessTokenCookie();

    if (!accessToken) {
        return {
            success: false,
            message: 'Authentication is required.',
        };
    }

    try {
        await deleteTask(accessToken, taskId);
        revalidatePath(AppRoutes.tasks);

        return {
            success: true,
            message: 'Task was successfully deleted.',
        };
    } catch (error) {
        return createErrorActionState(error);
    }
}
