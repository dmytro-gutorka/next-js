import 'server-only';

import axios from 'axios';

export function getServerHttpErrorStatus(error: unknown) {
    if (!axios.isAxiosError(error)) return null;

    return error.response?.status ?? null;
}
