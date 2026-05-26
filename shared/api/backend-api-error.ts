export type BackendErrorPayload = {
    error?: string;
    message?: string | string[];
    statusCode?: number;
};

export class BackendApiError extends Error {
    public readonly statusCode: number;
    public readonly payload: BackendErrorPayload | null;

    constructor(statusCode: number, payload: BackendErrorPayload | null) {
        super(getBackendErrorMessage(payload, statusCode));
        this.name = 'BackendApiError';
        this.statusCode = statusCode;
        this.payload = payload;
    }
}

export function getBackendErrorMessage(payload: BackendErrorPayload | null, statusCode: number) {
    if (!payload) {
        return `Backend request failed with status ${statusCode}`;
    }

    if (Array.isArray(payload.message)) {
        return payload.message.join(', ');
    }

    return payload.message ?? payload.error ?? `Backend request failed with status ${statusCode}`;
}

export function isBackendApiError(error: unknown): error is BackendApiError {
    return error instanceof BackendApiError;
}

export function toBackendErrorPayload(data: unknown): BackendErrorPayload | null {
    if (!data || typeof data !== 'object') return null;

    return data as BackendErrorPayload;
}
