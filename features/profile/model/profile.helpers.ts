import type { User } from '@/features/user/index.types';
import type { ProfileFormValues } from './profile.types';

export function mapUserToProfileFormValues(user: User): ProfileFormValues {
    return {
        name: user.name,
        surname: user.surname,
        birthday: user.birthday ?? '',
    };
}

export function calculateProfileCompleteness(user: User, values?: Partial<ProfileFormValues>) {
    const mergedValues = {
        name: values?.name ?? user.name,
        surname: values?.surname ?? user.surname,
        birthday: values?.birthday ?? user.birthday,
        avatarUrl: user.avatarUrl,
    };

    const fields = [
        mergedValues.name,
        mergedValues.surname,
        mergedValues.birthday,
        mergedValues.avatarUrl,
    ];

    const completedFields = fields.filter(Boolean).length;

    return Math.round((completedFields / fields.length) * 100);
}

export function getUserInitials(user: User) {
    const firstNameInitial = user.name?.[0] ?? '';
    const lastNameInitial = user.surname?.[0] ?? '';
    const initials = `${firstNameInitial}${lastNameInitial}`.trim();

    return initials || user.email[0]?.toUpperCase() || 'U';
}

export function formatDateTime(value: string | null) {
    if (!value) return '—';

    return new Intl.DateTimeFormat('en', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(new Date(value));
}
