'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, RotateCcw, Save } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import type { User } from '@/features/user/index.types';
import { Button } from '@/shared/lib/shadcn/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/shared/lib/shadcn/components/ui/card';
import { FieldGroup } from '@/shared/lib/shadcn/components/ui/field';
import { updateProfileAction } from '../../actions/update-profile.action';
import {
    calculateProfileCompleteness,
    mapUserToProfileFormValues,
} from '../../model/profile.helpers';
import { ProfileFormSchema } from '../../model/profile.schemas';
import type { ProfileFormValues, ProfileActionState } from '../../model/profile.types';
import { ProfileCompletenessCard } from './profile-completeness-card';
import { CustomActionAlert } from 'shared/ui/custom-action-alert';
import { CustomTextareaField } from 'shared/ui/custom-textarea-field';

const initialProfileActionState: ProfileActionState = {
    success: false,
};

interface ProfileFormProps {
    user: User;
}

export function ProfileForm({ user }: ProfileFormProps) {
    const [actionState, setActionState] = useState<ProfileActionState>(initialProfileActionState);
    const [isPending, setIsPending] = useState(false);

    const defaultValues = useMemo(() => mapUserToProfileFormValues(user), [user]);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(ProfileFormSchema),
        defaultValues,
        mode: 'onChange',
    });

    const values = useWatch({ control: form.control });
    const completeness = calculateProfileCompleteness(user, values);

    useEffect(() => {
        form.reset(defaultValues);
    }, [defaultValues, form]);

    const handleSubmit = form.handleSubmit(async (values) => {
        setIsPending(true);

        try {
            const result = await updateProfileAction(values);

            setActionState(result);

            if (result.success) form.reset(values);
        } finally {
            setIsPending(false);
        }
    });

    function handleCancel() {
        form.reset(defaultValues);
        setActionState(initialProfileActionState);
    }

    return (
        <>
            <ProfileCompletenessCard value={completeness} />

            <Card>
                <CardHeader>
                    <CardTitle>Personal information</CardTitle>
                    <CardDescription>Update your basic profile information.</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <CustomActionAlert state={actionState} />

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <FieldGroup>
                            <CustomTextareaField
                                id="name"
                                label="Name"
                                placeholder="Enter your name"
                                registration={form.register('name')}
                                error={form.formState.errors.name}
                                serverErrors={actionState.fieldErrors?.name}
                            />
                            <CustomTextareaField
                                id="surname"
                                label="Surname"
                                placeholder="Enter your surname"
                                registration={form.register('surname')}
                                error={form.formState.errors.surname}
                                serverErrors={actionState.fieldErrors?.surname}
                            />
                            <CustomTextareaField
                                id="birthday"
                                type="date"
                                label="Birthday"
                                registration={form.register('birthday')}
                                error={form.formState.errors.birthday}
                                serverErrors={actionState.fieldErrors?.birthday}
                            />
                        </FieldGroup>

                        <div className="flex flex-col-reverse gap-2 md:flex-row md:justify-end">
                            <Button
                                type="button"
                                variant="outline"
                                disabled={isPending || !form.formState.isDirty}
                                onClick={handleCancel}
                            >
                                <RotateCcw className="mr-2 size-4" />
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={
                                    isPending || !form.formState.isDirty || !form.formState.isValid
                                }
                            >
                                {isPending ? (
                                    <Loader2 className="mr-2 size-4 animate-spin" />
                                ) : (
                                    <Save className="mr-2 size-4" />
                                )}
                                Save changes
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}
