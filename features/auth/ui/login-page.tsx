import Link from 'next/link';
import { AppRoutes } from '@/shared/config/app-routes';
import { LoginForm } from 'features/auth/ui/common/forms/login-form';
import AuthPageWrapper from 'features/auth/ui/common/layout/auth-page-wrapper';
import { GoogleAuthButton } from 'features/auth/ui/common/buttons/google-auth-button';

export function LoginPage() {
    return (
        <AuthPageWrapper>
            <LoginForm />
            <p className="text-center text-sm text-muted-foreground">
                Don not have an account?
                <Link href={AppRoutes.registration} className="pl-[1ch] font-medium text-primary">
                    Create one
                </Link>
            </p>
            <div className="mt-4 flex justify-center">
                <GoogleAuthButton />
            </div>
        </AuthPageWrapper>
    );
}
