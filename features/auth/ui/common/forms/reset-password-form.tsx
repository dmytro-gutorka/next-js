'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordFormSchema } from 'features/auth/model/auth.schemas';
import { KeyRound } from 'lucide-react';
import { ResetPasswordCardWrapper } from 'features/auth/ui/common/layout/reset-password-card-wrapper';
import { ResetPasswordSuccessState } from 'features/auth/ui/common/states/reset-password-success-state';
import { CustomTextField } from 'shared/ui/custom-text-field';
import { CustomActionAlert } from 'shared/ui/custom-action-alert';
import { FieldGroup } from '@/shared/lib/shadcn/components/ui/field';
import { Button } from 'shared/lib/shadcn/components/ui/button';
import { useState } from 'react';
import { confirmPasswordResetAction } from 'features/auth/actions/confirm-password-reset.action';
import type { ResetPasswordFormValues, ActionState } from 'features/auth/model/auth.types';
import { initialActionState } from 'shared/lib/server-actions/action-state';

const resetPasswordFormDefaultValues: ResetPasswordFormValues = {
    newPassword: '',
    confirmPassword: '',
};

interface ResetPasswordFormProps {
    token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
    const [actionState, setActionState] = useState<ActionState>(initialActionState);
    const [isPending, setIsPending] = useState(false);

    const form = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(ResetPasswordFormSchema),
        defaultValues: resetPasswordFormDefaultValues,
    });

    const handleSubmit = form.handleSubmit(async (values: ResetPasswordFormValues) => {
        setIsPending(true);

        try {
            const result = await confirmPasswordResetAction({
                ...values,
                token,
            });

            setActionState(result);
        } finally {
            setIsPending(false);
        }
    });

    if (actionState.success) return <ResetPasswordSuccessState message={actionState.message} />;

    return (
        <ResetPasswordCardWrapper
            title="Reset password"
            description="Enter a new password for your account."
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <FieldGroup>
                    <CustomTextField
                        id="reset-new-password"
                        label="New password"
                        type="password"
                        placeholder="Enter new password"
                        registration={form.register('newPassword')}
                        error={form.formState.errors.newPassword}
                        serverErrors={actionState.fieldErrors?.newPassword}
                    />

                    <CustomTextField
                        id="reset-confirm-password"
                        label="Confirm password"
                        type="password"
                        placeholder="Repeat new password"
                        registration={form.register('confirmPassword')}
                        error={form.formState.errors.confirmPassword}
                        serverErrors={actionState.fieldErrors?.confirmPassword}
                    />
                </FieldGroup>

                <CustomActionAlert state={actionState} />

                <Button type="submit" className="w-full" disabled={isPending}>
                    <KeyRound className="mr-2 size-4" />
                    {isPending ? 'Resetting password...' : 'Reset password'}
                </Button>
            </form>
        </ResetPasswordCardWrapper>
    );
}
