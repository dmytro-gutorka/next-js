import { BackendApiError, toBackendErrorPayload } from './backend-api-error';
import { AuthCookieName } from '@/shared/config/auth';
import { getBackendUrl } from '@/shared/api/backend-url';

type ServerApiRequestOptions = Omit<RequestInit, 'body'> & {
    accessToken?: string;
    refreshToken?: string;
    formData?: FormData;
    json?: unknown;
};

interface ServerApiResponse<TData> {
    data: TData;
    headers: Headers;
    status: number;
}

export async function serverApiRequest<TData>(
    path: string,
    options: ServerApiRequestOptions = {},
): Promise<ServerApiResponse<TData>> {
    const { accessToken, refreshToken, json, formData, headers, ...requestInit } = options;

    const response = await fetch(getBackendUrl(path), {
        ...requestInit,
        headers: createRequestHeaders({
            headers,
            accessToken,
            refreshToken,
            hasJsonBody: json !== undefined,
        }),
        body: createRequestBody({ json, formData }),
    });

    const data = await parseResponseBody(response);

    if (!response.ok) throw new BackendApiError(response.status, toBackendErrorPayload(data));

    return {
        data: data as TData,
        headers: response.headers,
        status: response.status,
    };
}

function createRequestHeaders(input: {
    headers?: HeadersInit;
    accessToken?: string;
    refreshToken?: string;
    hasJsonBody: boolean;
}) {
    const headers = new Headers(input.headers);

    headers.set('Accept', 'application/json');

    if (input.hasJsonBody) {
        headers.set('Content-Type', 'application/json');
    }

    if (input.accessToken) {
        headers.set('Authorization', `Bearer ${input.accessToken}`);
    }

    if (input.refreshToken) {
        headers.set(
            'Cookie',
            `${AuthCookieName.refreshToken}=${encodeURIComponent(input.refreshToken)}`,
        );
    }

    return headers;
}

function createRequestBody(input: { json?: unknown; formData?: FormData }) {
    if (input.formData) return input.formData;

    if (input.json !== undefined) return JSON.stringify(input.json);

    return undefined;
}

async function parseResponseBody(response: Response): Promise<unknown> {
    const contentType = response.headers.get('content-type');

    if (!contentType?.includes('application/json')) return null;

    return response.json();
}
