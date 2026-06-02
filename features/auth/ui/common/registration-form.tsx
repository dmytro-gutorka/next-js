'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState, useRef, SubmitEvent } from 'react';
import { useForm } from 'react-hook-form';
import { registerAction } from '@/features/auth/index.actions';
import { CardFooter } from '@/shared/lib/shadcn/components/ui/card';
import { FieldGroup } from '@/shared/lib/shadcn/components/ui/field';
import { initialAuthActionState } from 'shared/lib/server-actions/action-state';
import { SignUpFormSchema } from 'features/auth/model/auth.schemas';
import { AuthFormCard } from './auth-form-card';
import { AuthSubmitButton } from './auth-submit-button';
import type { SignUpFormValues } from 'features/auth/model/auth.types';
import { CustomTextField } from 'shared/ui/custom-text-field';
import { CustomActionAlert } from 'shared/ui/custom-action-alert';

const registrationFormDefaultValues: SignUpFormValues = {
    email: '',
    password: '',
    confirmPassword: '',
};

export function RegistrationForm() {
    const [state, formAction, isPending] = useActionState(registerAction, initialAuthActionState);
    const formRef = useRef<HTMLFormElement>(null);
    const form = useForm<SignUpFormValues>({
        resolver: zodResolver(SignUpFormSchema),
        defaultValues: registrationFormDefaultValues,
    });

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
        <AuthFormCard title="Create account" description="You could manage your tasks anywhere.">
            <form
                ref={formRef}
                id="registration-form"
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                <FieldGroup>
                    <CustomTextField
                        id="registration-email"
                        label="Email"
                        placeholder="name@example.com"
                        registration={form.register('email')}
                        error={form.formState.errors.email}
                        serverErrors={state.fieldErrors?.email}
                    />

                    <CustomTextField
                        id="registration-password"
                        label="Password"
                        placeholder="Create a password"
                        type="password"
                        registration={form.register('password')}
                        error={form.formState.errors.password}
                        serverErrors={state.fieldErrors?.password}
                    />

                    <CustomTextField
                        id="registration-confirm-password"
                        label="Confirm password"
                        placeholder="Repeat your password"
                        type="password"
                        registration={form.register('confirmPassword')}
                        error={form.formState.errors.confirmPassword}
                        serverErrors={state.fieldErrors?.confirmPassword}
                    />
                </FieldGroup>

                <CustomActionAlert state={state} />
            </form>

            <CardFooter className="border-y-transparent bg-transparent px-0">
                <AuthSubmitButton form="registration-form" isPending={isPending}>
                    Create account
                </AuthSubmitButton>
            </CardFooter>
        </AuthFormCard>
    );
}
