import type { ComponentProps } from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import {
    Field,
    FieldError as FieldErrorMessage,
    FieldLabel,
} from '@/shared/lib/shadcn/components/ui/field';
import { Input } from '@/shared/lib/shadcn/components/ui/input';

interface AuthTextFieldProps {
    id: string;
    label: string;
    registration: UseFormRegisterReturn;
    error?: FieldError;
    serverErrors?: string[];
    placeholder?: string;
    type?: ComponentProps<typeof Input>['type'];
}

export function AuthTextField({
    id,
    label,
    registration,
    error,
    serverErrors,
    placeholder,
    type = 'text',
}: AuthTextFieldProps) {
    const errors = [error, ...(serverErrors?.map((message) => ({ message })) ?? [])];
    const isInvalid = Boolean(error) || Boolean(serverErrors?.length);

    return (
        <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={id}>{label}</FieldLabel>
            <Input
                {...registration}
                id={id}
                type={type}
                placeholder={placeholder}
                aria-invalid={isInvalid}
                aria-label={label}
            />
            <FieldErrorMessage errors={errors} />
        </Field>
    );
}
