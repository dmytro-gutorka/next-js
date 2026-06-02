import 'server-only';

import { notFound } from 'next/navigation';
import { getAccessTokenCookie } from '@/features/auth/server/session-cookies';
import { getTaskById } from './tasks-api';
import { getServerHttpErrorStatus } from 'shared/server/api/http-error.helpers';

export async function getTaskDetailsData(taskId: string) {
    const accessToken = await getAccessTokenCookie();

    if (!accessToken) throw new Error('Access token is required for tasks page data.');

    try {
        return await getTaskById(accessToken, taskId);
    } catch (error) {
        if (getServerHttpErrorStatus(error) === 404) notFound();

        throw error;
    }
}
