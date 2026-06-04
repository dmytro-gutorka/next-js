import 'server-only';

import axios, { type InternalAxiosRequestConfig, type AxiosError } from 'axios';
import { getBackendUrl, getBackendTimeout } from '@/shared/server/api/backend.helpers';
import { refreshSessionCookies } from 'features/auth/server/session-cookies';

type RetryableAxiosRequestConfig = InternalAxiosRequestConfig & {
    _retry?: boolean;
};

export const serverHttpClient = axios.create({
    baseURL: getBackendUrl('/'),
    timeout: getBackendTimeout(),
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

serverHttpClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const config = error.config as RetryableAxiosRequestConfig | undefined;

        if (!config || error.response?.status !== 401 || config._retry) {
            throw error;
        }

        config._retry = true;

        const refreshedSession = await refreshSessionCookies();

        if (!refreshedSession) {
            throw error;
        }

        config.headers.Authorization = `Bearer ${refreshedSession.accessToken}`;

        return serverHttpClient.request(config);
    },
);
