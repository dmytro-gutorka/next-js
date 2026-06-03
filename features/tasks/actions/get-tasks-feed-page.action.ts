'use server';

import { getAccessTokenCookie } from '@/features/auth/server/session-cookies';
import { getServerHttpErrorMessage } from '@/shared/lib/api/http-error-helpers';
import type { CursorParams } from '@/shared/types/common.types';
import type { TasksCursorResponse } from 'features/tasks/model/task.types';
import { getTasksFeedPage } from 'features/tasks/server/tasks-api';

type GetTasksFeedPageActionResult =
    | {
          success: true;
          data: TasksCursorResponse;
      }
    | {
          success: false;
          message: string;
      };

export async function getTasksFeedPageAction(
    params: Partial<CursorParams>,
): Promise<GetTasksFeedPageActionResult> {
    const accessToken = await getAccessTokenCookie();

    if (!accessToken) {
        return {
            success: false,
            message: 'Authentication is required.',
        };
    }

    try {
        const data = await getTasksFeedPage(accessToken, params);

        return {
            success: true,
            data,
        };
    } catch (error) {
        return {
            success: false,
            message: getServerHttpErrorMessage(error),
        };
    }
}
