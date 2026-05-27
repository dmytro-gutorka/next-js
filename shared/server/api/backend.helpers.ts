import 'server-only';

export function getBackendUrl(path: string) {
    const baseUrl = process.env.NEXT_BACKEND_API_URL;

    if (!baseUrl) throw new Error('BACKEND_API_URL is required');

    return `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

export function getBackendTimeout() {
    return Number(process.env.NEXT_BACKEND_TIMEOUT ?? 10000);
}
