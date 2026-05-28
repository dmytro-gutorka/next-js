import axios, { type AxiosError } from 'axios';
import type { BackendErrorPayload } from 'shared/server/api/types';

export function getServerHttpErrorMessage(error: unknown) {
    if (!axios.isAxiosError(error)) {
        return 'Unexpected error occurred.';
    }

    return getAxiosErrorMessage(error);
}

function getAxiosErrorMessage(error: AxiosError) {
    const responseData = error.response?.data;

    if (isBackendErrorPayload(responseData)) {
        if (Array.isArray(responseData.message)) return responseData.message.join(', ');

        if (responseData.message) return responseData.message;
        if (responseData.error) return responseData.error;
    }

    return error.message || 'Unexpected error occurred.';
}

function isBackendErrorPayload(value: unknown): value is BackendErrorPayload {
    return Boolean(value) && typeof value === 'object';
}
