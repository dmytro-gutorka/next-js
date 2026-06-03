'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { registerAction } from 'features/auth/index.actions';
import { CardFooter } from 'shared/lib/shadcn/components/ui/card';
import { FieldGroup } from 'shared/lib/shadcn/components/ui/field';
import { SignUpFormSchema } from 'features/auth/model/auth.schemas';
import { AuthFormCard } from 'features/auth/ui/common/layout/auth-form-card';
import { AuthSubmitButton } from 'features/auth/ui/common/buttons/auth-submit-button';
import type {
    SignUpFormValues,
    ActionState,
    SignInLocalPayload,
} from 'features/auth/model/auth.types';
import { CustomTextareaField } from 'shared/ui/custom-textarea-field';
import { CustomActionAlert } from 'shared/ui/custom-action-alert';
import { initialActionState } from 'shared/lib/server-actions/action-state';

const registrationFormDefaultValues: SignUpFormValues = {
    email: '',
    password: '',
    confirmPassword: '',
};

export function RegistrationForm() {
    const [actionState, setActionState] = useState<ActionState>(initialActionState);
    const [isPending, setIsPending] = useState(false);

    const form = useForm<SignUpFormValues>({
        resolver: zodResolver(SignUpFormSchema),
        defaultValues: registrationFormDefaultValues,
    });

    const handleSubmit = form.handleSubmit(async (values: SignInLocalPayload) => {
        setIsPending(true);

        try {
            const result = await registerAction(values);

            setActionState(result);
        } finally {
            setIsPending(false);
        }
    });

    return (
        <AuthFormCard title="Create account" description="You could manage your tasks anywhere.">
            <form id="registration-form" onSubmit={handleSubmit} className="space-y-5">
                <FieldGroup>
                    <CustomTextareaField
                        id="registration-email"
                        label="Email"
                        placeholder="name@example.com"
                        registration={form.register('email')}
                        error={form.formState.errors.email}
                        serverErrors={actionState.fieldErrors?.email}
                    />

                    <CustomTextareaField
                        id="registration-password"
                        label="Password"
                        placeholder="Create a password"
                        type="password"
                        registration={form.register('password')}
                        error={form.formState.errors.password}
                        serverErrors={actionState.fieldErrors?.password}
                    />

                    <CustomTextareaField
                        id="registration-confirm-password"
                        label="Confirm password"
                        placeholder="Repeat your password"
                        type="password"
                        registration={form.register('confirmPassword')}
                        error={form.formState.errors.confirmPassword}
                        serverErrors={actionState.fieldErrors?.confirmPassword}
                    />
                </FieldGroup>

                <CustomActionAlert state={actionState} />
            </form>

            <CardFooter className="border-y-transparent bg-transparent px-0">
                <AuthSubmitButton form="registration-form" isPending={isPending}>
                    Create account
                </AuthSubmitButton>
            </CardFooter>
        </AuthFormCard>
    );
}
