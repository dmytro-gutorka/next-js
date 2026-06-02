'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState, useRef, SubmitEvent } from 'react';
import { useForm } from 'react-hook-form';
import { loginAction } from '@/features/auth/index.actions';
import { SignInLocalSchema } from '@/features/auth/model/auth.schemas';
import type { SignInLocalPayload } from '@/features/auth/model/auth.types';
import { CardFooter } from '@/shared/lib/shadcn/components/ui/card';
import { FieldGroup } from '@/shared/lib/shadcn/components/ui/field';
import { AuthFormCard } from './auth-form-card';
import { AuthSubmitButton } from './auth-submit-button';
import { initialAuthActionState } from 'shared/lib/server-actions/action-state';
import { CustomTextField } from 'shared/ui/custom-text-field';
import { CustomActionAlert } from 'shared/ui/custom-action-alert';

const loginFormDefaultValues: SignInLocalPayload = {
    email: '',
    password: '',
};

export function LoginForm() {
    const [state, formAction, isPending] = useActionState(loginAction, initialAuthActionState);
    const formRef = useRef<HTMLFormElement>(null);
    const form = useForm<SignInLocalPayload>({
        resolver: zodResolver(SignInLocalSchema),
        defaultValues: loginFormDefaultValues,
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
        <AuthFormCard title="Sign in" description="Use your email and password to continue.">
            <form ref={formRef} id="login-form" onSubmit={handleSubmit} className="space-y-5">
                <FieldGroup>
                    <CustomTextField
                        id="login-email"
                        label="Email"
                        placeholder="name@example.com"
                        registration={form.register('email')}
                        error={form.formState.errors.email}
                        serverErrors={state.fieldErrors?.email}
                    />

                    <CustomTextField
                        id="login-password"
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        registration={form.register('password')}
                        error={form.formState.errors.password}
                        serverErrors={state.fieldErrors?.password}
                    />
                </FieldGroup>

                <CustomActionAlert state={state} />
            </form>

            <CardFooter className="border-y-transparent bg-transparent px-0">
                <AuthSubmitButton form="login-form" isPending={isPending}>
                    Sign in
                </AuthSubmitButton>
            </CardFooter>
        </AuthFormCard>
    );
}
