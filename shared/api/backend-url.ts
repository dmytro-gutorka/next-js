export function getBackendUrl(path: string) {
    const baseUrl = process.env.BACKEND_API_URL;

    if (!baseUrl) {
        throw new Error('BACKEND_API_URL is required');
    }

    return `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
