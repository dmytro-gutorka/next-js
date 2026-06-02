'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { KeyRound, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { initialActionState } from 'shared/lib/server-actions/action-state';
import { SetLocalPasswordSchema } from '@/features/auth/model/auth.schemas';
import type { SetLocalPasswordPayload, ActionState } from '@/features/auth/index.types';
import { Button } from '@/shared/lib/shadcn/components/ui/button';
import { FieldGroup } from '@/shared/lib/shadcn/components/ui/field';
import { CustomTextField } from 'shared/ui/custom-text-field';
import { SecurityPageAlert } from 'features/profile/ui/security/security-page-alers';
import { setLocalPasswordAction } from 'features/auth/actions/set-local-password.action';

const localPasswordFormDefaultValues = {
    password: '',
    confirmPassword: '',
};

export function LocalPasswordForm() {
    const [actionState, setActionState] = useState<ActionState>(initialActionState);
    const [isPending, setIsPending] = useState(false);

    const form = useForm<SetLocalPasswordPayload>({
        resolver: zodResolver(SetLocalPasswordSchema),
        defaultValues: localPasswordFormDefaultValues,
        mode: 'onChange',
    });

    const handleSubmit = form.handleSubmit(async (values: SetLocalPasswordPayload) => {
        setIsPending(true);

        try {
            const result = await setLocalPasswordAction(values);

            setActionState(result);
        } finally {
            setIsPending(false);
        }
    });

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <SecurityPageAlert message={actionState.message} isSuccess={actionState.success} />

            <FieldGroup>
                <CustomTextField
                    id="password"
                    type="password"
                    label="Password"
                    placeholder="Enter password"
                    registration={form.register('password')}
                    error={form.formState.errors.password}
                    serverErrors={actionState.fieldErrors?.password}
                />
                <CustomTextField
                    id="confirmPassword"
                    type="password"
                    label="Confirm password"
                    placeholder="Repeat password"
                    registration={form.register('confirmPassword')}
                    error={form.formState.errors.confirmPassword}
                    serverErrors={actionState.fieldErrors?.confirmPassword}
                />
            </FieldGroup>

            <Button
                type="submit"
                disabled={isPending || actionState.success || !form.formState.isValid}
                className="w-full md:w-auto"
            >
                {isPending ? (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                ) : (
                    <KeyRound className="mr-2 size-4" />
                )}
                Set password
            </Button>
        </form>
    );
}
