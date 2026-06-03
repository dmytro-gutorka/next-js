import { AppRoutes } from 'shared/config/app-routes';

export const protectedRoutePrefixes: readonly string[] = [AppRoutes.tasks, AppRoutes.profile];
export const publicOnlyRoutes: readonly string[] = [AppRoutes.login, AppRoutes.registration];
