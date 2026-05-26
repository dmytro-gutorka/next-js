import { ResetPasswordPage } from '@/features/auth/index.ui';
import { redirectIfAuthenticated } from '@/features/auth/index.server';

async function ResetPasswordRoutePage() {
    await redirectIfAuthenticated();

    return <ResetPasswordPage />;
}

export default ResetPasswordRoutePage;
