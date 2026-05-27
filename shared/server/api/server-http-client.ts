import 'server-only';

import axios from 'axios';
import { getBackendUrl, getBackendTimeout } from '@/shared/server/api/backend.helpers';

export const serverHttpClient = axios.create({
    baseURL: getBackendUrl('/'),
    timeout: getBackendTimeout(),
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});
