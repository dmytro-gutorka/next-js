'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { KeyRound, Loader2 } from 'lucide-react';
import { useActionState, useTransition, SubmitEvent, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { initialAuthActionState } from 'shared/lib/server-actions/action-state';
import { SetLocalPasswordSchema } from '@/features/auth/model/auth.schemas';
import type { SetLocalPasswordPayload } from '@/features/auth/index.types';
import { Button } from '@/shared/lib/shadcn/components/ui/button';
import { FieldGroup } from '@/shared/lib/shadcn/components/ui/field';
import { setLocalPasswordAction } from 'features/auth/actions/set-local-password.action';
import { CustomTextField } from 'shared/ui/custom-text-field';
import { SecurityPageAlert } from 'features/profile/ui/security/security-page-alers';

export function SetLocalPasswordForm() {
    const [state, formAction, isActionPending] = useActionState(
        setLocalPasswordAction,
        initialAuthActionState,
    );
    const [isTransitionPending, startTransition] = useTransition();

    const formRef = useRef<HTMLFormElement>(null);
    const form = useForm<SetLocalPasswordPayload>({
        resolver: zodResolver(SetLocalPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
        mode: 'onChange',
    });

    const isSubmitting = isActionPending || isTransitionPending;

    function handleSubmit(event: SubmitEvent) {
        event.preventDefault();

        void form.handleSubmit(() => {
            if (!formRef.current) return;

            const formData = new FormData(formRef.current);

            startTransition(() => {
                formAction(formData);
            });
        })(event);
    }

    return (
        <form className="space-y-4" onSubmit={handleSubmit} ref={formRef}>
            <SecurityPageAlert message={state.message} isSuccess={state.success} />

            <FieldGroup>
                <CustomTextField
                    id="password"
                    type="password"
                    label="Password"
                    placeholder="Enter password"
                    registration={form.register('password')}
                    error={form.formState.errors.password}
                    serverErrors={state.fieldErrors?.password}
                />
                <CustomTextField
                    id="confirmPassword"
                    type="password"
                    label="Confirm password"
                    placeholder="Repeat password"
                    registration={form.register('confirmPassword')}
                    error={form.formState.errors.confirmPassword}
                    serverErrors={state.fieldErrors?.confirmPassword}
                />
            </FieldGroup>

            <Button
                type="submit"
                disabled={isSubmitting || state.success || !form.formState.isValid}
                className="w-full md:w-auto"
            >
                {isSubmitting ? (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                ) : (
                    <KeyRound className="mr-2 size-4" />
                )}
                Set password
            </Button>
        </form>
    );
}
