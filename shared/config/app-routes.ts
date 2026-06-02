export const AppRoutes = {
    home: '/',
    tasks: '/tasks',
    taskDetails: (taskId: string) => `/tasks/${taskId}`,
    login: '/login',
    registration: '/registration',
    resetPassword: '/reset-password',
    profile: '/profile',
    profileDetails: '/profile/details',
    profilePreferences: '/profile/preferences',
    profileSecurity: '/profile/security',
} as const;
