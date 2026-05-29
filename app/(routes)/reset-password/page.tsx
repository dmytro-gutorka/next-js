import { ResetPasswordPage } from 'features/auth/ui/reset-password-page';
import type { SearchParams } from 'shared/types/common.types';
import { ResetPasswordInvalidTokenState } from 'features/auth/ui/common/reset-password-invalid-token-state';

interface ResetPasswordRoutePageProps {
    searchParams: SearchParams;
}

async function ResetPasswordRoutePage({ searchParams }: ResetPasswordRoutePageProps) {
    const { token } = await searchParams;

    if (typeof token !== 'string') return <ResetPasswordInvalidTokenState />;

    return <ResetPasswordPage token={token} />;
}

export default ResetPasswordRoutePage;
