import { TriangleAlert } from 'lucide-react';
import Link from 'next/link';
import { AppRoutes } from '@/shared/config/app-routes';
import { Alert, AlertDescription, AlertTitle } from '@/shared/lib/shadcn/components/ui/alert';
import { Button } from '@/shared/lib/shadcn/components/ui/button';

import { ResetPasswordCardLayout } from './reset-password-card-layout';

export function ResetPasswordInvalidTokenState() {
    return (
        <ResetPasswordCardLayout
            title="Reset password"
            description="The reset link is invalid because the token is missing."
        >
            <div className="space-y-4">
                <Alert variant="destructive">
                    <TriangleAlert className="size-4" />
                    <AlertTitle>Invalid reset link</AlertTitle>
                    <AlertDescription>
                        Please request a new password reset link from your profile security settings.
                    </AlertDescription>
                </Alert>

                <Button asChild className="w-full">
                    <Link href={AppRoutes.profile}>Back to profile</Link>
                </Button>
            </div>
        </ResetPasswordCardLayout>
    );
}
