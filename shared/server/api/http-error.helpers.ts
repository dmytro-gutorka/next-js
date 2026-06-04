import 'server-only';

import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from 'axios';

export function getServerHttpErrorStatus(error: unknown) {
    if (!axios.isAxiosError(error)) return null;

    return error.response?.status ?? null;
}

export function hasAuthorizationHeader(config: InternalAxiosRequestConfig) {
    return AxiosHeaders.from(config.headers).has('Authorization');
}

export function setAuthorizationHeader(config: InternalAxiosRequestConfig, accessToken: string) {
    const headers = AxiosHeaders.from(config.headers);

    headers.set('Authorization', `Bearer ${accessToken}`);
    config.headers = headers;
}
