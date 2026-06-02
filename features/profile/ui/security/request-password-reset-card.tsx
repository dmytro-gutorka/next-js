'use client';

import { KeyRound, Loader2 } from 'lucide-react';
import { useActionState } from 'react';
import { requestPasswordResetAction } from '@/features/auth/index.actions';
import { initialAuthActionState } from 'shared/lib/server-actions/action-state';
import { Button } from '@/shared/lib/shadcn/components/ui/button';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/shared/lib/shadcn/components/ui/card';
import { SecurityPageAlert } from 'features/profile/ui/security/security-page-alers';

export function RequestPasswordResetCard() {
    const [state, formAction, isPending] = useActionState(
        requestPasswordResetAction,
        initialAuthActionState,
    );

    return (
        <Card>
            <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                    <CardTitle className="text-sm font-medium">Change password</CardTitle>
                    <CardDescription>
                        Generate a password reset link for your account. The link can be used once
                        and expires automatically.
                    </CardDescription>
                    <SecurityPageAlert message={state.message} isSuccess={state.success} />
                </div>

                <form action={formAction}>
                    <Button type="submit" disabled={isPending || state.success}>
                        {isPending ? (
                            <Loader2 className="mr-2 size-4 animate-spin" />
                        ) : (
                            <KeyRound className="mr-2 size-4" />
                        )}
                        Change password
                    </Button>
                </form>
            </CardHeader>
        </Card>
    );
}
