'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, RotateCcw, Save } from 'lucide-react';
import { useActionState, useEffect, useTransition, useRef, SubmitEvent } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { initialAuthActionState } from 'shared/lib/server-actions/action-state';
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
import type { ProfileFormValues } from '../../model/profile.types';
import { ProfileCompletenessCard } from './profile-completeness-card';
import { CustomActionAlert } from 'shared/ui/custom-action-alert';
import { CustomTextField } from 'shared/ui/custom-text-field';

interface ProfileFormProps {
    user: User;
}

export function ProfileForm({ user }: ProfileFormProps) {
    const [isTransitionPending, startTransition] = useTransition();
    const [state, formAction, isActionPending] = useActionState(
        updateProfileAction,
        initialAuthActionState,
    );

    const formRef = useRef<HTMLFormElement>(null);
    const defaultValues = mapUserToProfileFormValues(user);
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(ProfileFormSchema),
        defaultValues,
        mode: 'onChange',
    });

    const values = useWatch({ control: form.control });
    const isSubmitting = isActionPending || isTransitionPending;
    const completeness = calculateProfileCompleteness(user, values);

    useEffect(() => {
        form.reset(mapUserToProfileFormValues(user));
    }, [form, user]);

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

    function handleCancel() {
        form.reset(defaultValues);
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
                    <CustomActionAlert state={state} />

                    <form className="space-y-5" ref={formRef} onSubmit={handleSubmit}>
                        <FieldGroup>
                            <CustomTextField
                                id="name"
                                label="Name"
                                placeholder="Enter your name"
                                registration={form.register('name')}
                                error={form.formState.errors.name}
                                serverErrors={state.fieldErrors?.name}
                            />
                            <CustomTextField
                                id="surname"
                                label="Surname"
                                placeholder="Enter your surname"
                                registration={form.register('surname')}
                                error={form.formState.errors.surname}
                                serverErrors={state.fieldErrors?.surname}
                            />
                            <CustomTextField
                                id="birthday"
                                type="date"
                                label="Birthday"
                                registration={form.register('birthday')}
                                error={form.formState.errors.birthday}
                                serverErrors={state.fieldErrors?.birthday}
                            />
                        </FieldGroup>

                        <div className="flex flex-col-reverse gap-2 md:flex-row md:justify-end">
                            <Button
                                type="button"
                                variant="outline"
                                disabled={isSubmitting || !form.formState.isDirty}
                                onClick={handleCancel}
                            >
                                <RotateCcw className="mr-2 size-4" />
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={
                                    isSubmitting ||
                                    !form.formState.isDirty ||
                                    !form.formState.isValid
                                }
                            >
                                {isSubmitting ? (
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
