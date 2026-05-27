'use server';

import { redirect } from 'next/navigation';
import { AppRoutes } from 'shared/config/app-routes';
import { clearSessionCookies } from '../server/session-cookies';

export async function logoutAction() {
    await clearSessionCookies();

    redirect(AppRoutes.login);
}
