import type { User } from '@/features/user/index.types';

import { formatDateTime } from '../../model/profile.helpers';
import { ReadonlyField } from '../common/readonly-field';

interface ProfileReadonlyInfoProps {
    user: User;
}

export function ProfileReadonlyInfo({ user }: ProfileReadonlyInfoProps) {
    return (
        <dl className="grid gap-3 md:grid-cols-2">
            <ReadonlyField label="Email" value={user.email} />
            <ReadonlyField label="User ID" value={user.id} />
            <ReadonlyField label="Last login" value={formatDateTime(user.lastLoginAt)} />
            <ReadonlyField label="Created at" value={formatDateTime(user.createdAt)} />
            <ReadonlyField label="Updated at" value={formatDateTime(user.updatedAt)} />
        </dl>
    );
}
