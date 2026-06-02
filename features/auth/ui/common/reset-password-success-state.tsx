import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { AppRoutes } from '@/shared/config/app-routes';
import { Alert, AlertDescription, AlertTitle } from '@/shared/lib/shadcn/components/ui/alert';
import { Button } from '@/shared/lib/shadcn/components/ui/button';

import { ResetPasswordCardLayout } from './reset-password-card-layout';

interface ResetPasswordSuccessStateProps {
    message?: string;
}

export function ResetPasswordSuccessState({ message }: ResetPasswordSuccessStateProps) {
    return (
        <ResetPasswordCardLayout
            title="Password reset"
            description="Your password has been updated successfully."
        >
            <div className="space-y-4">
                <Alert>
                    <CheckCircle2 className="size-4" />
                    <AlertTitle>Password updated</AlertTitle>
                    <AlertDescription>
                        {message ??
                            'You can now continue using your account with the new password.'}
                    </AlertDescription>
                </Alert>

                <Button asChild className="w-full">
                    <Link href={AppRoutes.profile}>Go to profile</Link>
                </Button>
            </div>
        </ResetPasswordCardLayout>
    );
}
