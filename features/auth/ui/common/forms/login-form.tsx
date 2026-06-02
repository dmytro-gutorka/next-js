'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SignInLocalSchema } from 'features/auth/model/auth.schemas';
import type { SignInLocalPayload, ActionState } from 'features/auth/model/auth.types';
import { CardFooter } from 'shared/lib/shadcn/components/ui/card';
import { FieldGroup } from 'shared/lib/shadcn/components/ui/field';
import { AuthFormCard } from 'features/auth/ui/common/layout/auth-form-card';
import { AuthSubmitButton } from 'features/auth/ui/common/buttons/auth-submit-button';
import { CustomTextField } from 'shared/ui/custom-text-field';
import { CustomActionAlert } from 'shared/ui/custom-action-alert';
import { loginAction } from 'features/auth/actions/login.action';
import { initialActionState } from 'shared/lib/server-actions/action-state';

const loginFormDefaultValues: SignInLocalPayload = {
    email: '',
    password: '',
};

export function LoginForm() {
    const [actionState, setActionState] = useState<ActionState>(initialActionState);
    const [isPending, setIsPending] = useState(false);

    const form = useForm<SignInLocalPayload>({
        resolver: zodResolver(SignInLocalSchema),
        defaultValues: loginFormDefaultValues,
    });

    const handleSubmit = form.handleSubmit(async (values: SignInLocalPayload) => {
        setIsPending(true);

        try {
            const result = await loginAction(values);

            setActionState(result);
        } finally {
            setIsPending(false);
        }
    });

    return (
        <AuthFormCard title="Sign in" description="Use your email and password to continue.">
            <form id="login-form" onSubmit={handleSubmit} className="space-y-5">
                <FieldGroup>
                    <CustomTextField
                        id="login-email"
                        label="Email"
                        placeholder="name@example.com"
                        registration={form.register('email')}
                        error={form.formState.errors.email}
                        serverErrors={actionState.fieldErrors?.email}
                    />

                    <CustomTextField
                        id="login-password"
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        registration={form.register('password')}
                        error={form.formState.errors.password}
                        serverErrors={actionState.fieldErrors?.password}
                    />
                </FieldGroup>

                <CustomActionAlert state={actionState} />
            </form>

            <CardFooter className="border-y-transparent bg-transparent px-0">
                <AuthSubmitButton form="login-form" isPending={isPending}>
                    Sign in
                </AuthSubmitButton>
            </CardFooter>
        </AuthFormCard>
    );
}
