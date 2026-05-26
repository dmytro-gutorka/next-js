import { parse } from 'set-cookie-parser';

export function getCookieValueFromHeaders(headers: Headers, cookieName: string) {
    const setCookieHeader = headers.get('set-cookie');

    if (!setCookieHeader) return null;

    const cookies = parse(setCookieHeader);

    return cookies.find((cookie) => cookie.name === cookieName)?.value ?? null;
}
