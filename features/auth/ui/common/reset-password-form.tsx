'use client';

import { Button } from '@/shared/lib/shadcn/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { confirmPasswordResetAction } from '@/features/auth/index.actions';
import { startTransition, useActionState, useRef, type SubmitEvent } from 'react';
import { FieldGroup } from '@/shared/lib/shadcn/components/ui/field';
import { ResetPasswordFormSchema } from 'features/auth/model/auth.schemas';
import { initialAuthActionState } from 'shared/lib/server-actions/action-state';
import { KeyRound } from 'lucide-react';
import { ResetPasswordCardLayout } from './reset-password-card-layout';
import { ResetPasswordSuccessState } from './reset-password-success-state';
import { CustomTextField } from 'shared/ui/custom-text-field';
import { CustomActionAlert } from 'shared/ui/custom-action-alert';
import type { ResetPasswordFormValues } from 'features/auth/model/auth.types';

const resetPasswordFormDefaultValues: ResetPasswordFormValues = {
    newPassword: '',
    confirmPassword: '',
};

interface ResetPasswordFormProps {
    token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
    const [state, formAction, isPending] = useActionState(
        confirmPasswordResetAction,
        initialAuthActionState,
    );
    const formRef = useRef<HTMLFormElement>(null);
    const form = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(ResetPasswordFormSchema),
        defaultValues: resetPasswordFormDefaultValues,
    });

    function handleSubmit(event: SubmitEvent) {
        event.preventDefault();

        void form.handleSubmit(() => {
            if (!formRef.current) return;

            const formData = new FormData(formRef.current);
            formData.append('token', token);

            startTransition(() => {
                formAction(formData);
            });
        })(event);
    }

    if (state.success) return <ResetPasswordSuccessState message={state.message} />;

    return (
        <ResetPasswordCardLayout
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
                        serverErrors={state.fieldErrors?.newPassword}
                    />

                    <CustomTextField
                        id="reset-confirm-password"
                        label="Confirm password"
                        type="password"
                        placeholder="Repeat new password"
                        registration={form.register('confirmPassword')}
                        error={form.formState.errors.confirmPassword}
                        serverErrors={state.fieldErrors?.confirmPassword}
                    />
                </FieldGroup>

                <CustomActionAlert state={state} />

                <Button type="submit" className="w-full" disabled={isPending}>
                    <KeyRound className="mr-2 size-4" />
                    {isPending ? 'Resetting password...' : 'Reset password'}
                </Button>
            </form>
        </ResetPasswordCardLayout>
    );
}
