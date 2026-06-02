import { ResetPasswordForm } from 'features/auth/ui/common/reset-password-form';

interface ResetPasswordPageProps {
    token: string;
}

export async function ResetPasswordPage({ token }: ResetPasswordPageProps) {
    return <ResetPasswordForm token={token} />;
}
