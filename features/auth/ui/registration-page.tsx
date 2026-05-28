'use client';

import Link from 'next/link';

import { AppRoutes } from '@/shared/config/app-routes';

import { RegistrationForm } from './common/registration-form';
import AuthPageWrapper from 'features/auth/ui/common/auth-page-wrapper';

export function RegistrationPage() {
    return (
        <AuthPageWrapper>
            <RegistrationForm />

            <p className="text-center text-sm text-muted-foreground">
                Already have an account?
                <Link href={AppRoutes.login} className="pl-[1ch] font-medium text-primary">
                    Sign in
                </Link>
            </p>
        </AuthPageWrapper>
    );
}
