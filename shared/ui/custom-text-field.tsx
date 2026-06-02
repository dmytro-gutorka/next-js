import type { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import type { ComponentProps } from 'react';
import { Input } from 'shared/lib/shadcn/components/ui/input';
import {
    Field,
    FieldLabel,
    FieldError as FieldErrorMessage,
} from 'shared/lib/shadcn/components/ui/field';

interface CustomTextFieldProps {
    id: string;
    label: string;
    registration: UseFormRegisterReturn;
    error?: FieldError;
    serverErrors?: string[];
    placeholder?: string;
    type?: ComponentProps<typeof Input>['type'];
}

export function CustomTextField({
    id,
    label,
    registration,
    error,
    serverErrors,
    placeholder,
    type = 'text',
}: CustomTextFieldProps) {
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
