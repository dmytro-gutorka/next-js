import 'server-only';

import { getAccessTokenCookie } from '@/features/auth/server/session-cookies';
import { normalizeTasksSearchParams } from '../model/task.helpers';
import { getTasksPage } from './tasks-api';
import type { TasksPageSearchParams } from '../model/task.types';

export async function getTasksPageData(searchParams: TasksPageSearchParams) {
    const accessToken = await getAccessTokenCookie();

    if (!accessToken) throw new Error('Access token is required for tasks page data.');

    const queryState = normalizeTasksSearchParams(searchParams);
    const tasksPage = await getTasksPage(accessToken, queryState);

    return {
        queryState,
        tasksPage,
    };
}
