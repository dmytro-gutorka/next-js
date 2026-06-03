import type { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import {
    Field,
    FieldLabel,
    FieldError as FieldErrorMessage,
    FieldDescription,
} from 'shared/lib/shadcn/components/ui/field';
import { Input } from 'shared/lib/shadcn/components/ui/input';

interface CustomTextFieldProps {
    id: string;
    label: string;
    registration: UseFormRegisterReturn;
    error?: FieldError;
    serverErrors?: string[];
    placeholder?: string;
    description?: string;
    type?: string;
}

export function CustomTextareaField({
    id,
    label,
    registration,
    error,
    serverErrors,
    placeholder,
    description,
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

            {description && <FieldDescription>{description}</FieldDescription>}

            <FieldErrorMessage errors={errors} />
        </Field>
    );
}
