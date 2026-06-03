'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/shared/lib/shadcn/components/ui/button';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldError,
} from '@/shared/lib/shadcn/components/ui/field';
import { Input } from '@/shared/lib/shadcn/components/ui/input';
import { Label } from '@/shared/lib/shadcn/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/lib/shadcn/components/ui/select';
import { TASK_PRIORITY, TASK_STATUS } from '../../model/task.constants';
import { getTaskFormDefaultValues } from '../../model/task.helpers';
import { TaskFormSchema } from '../../model/task.schemas';
import type { Task, TaskFormValues, TaskFormInput } from '../../model/task.types';
import type { ActionState } from 'features/auth/model/auth.types';
import { Switch } from 'shared/lib/shadcn/components/ui/switch';
import { CustomTextareaField } from 'shared/ui/custom-textarea-field';

export interface TaskFormProps {
    formId: string;
    task?: Task;
    actionState: ActionState;
    isPending: boolean;
    submitLabel: string;
    onSubmit: (values: TaskFormValues) => Promise<void>;
}

export function TaskForm({
    formId,
    task,
    actionState,
    isPending,
    submitLabel,
    onSubmit,
}: TaskFormProps) {
    const form = useForm<TaskFormInput, unknown, TaskFormValues>({
        resolver: zodResolver(TaskFormSchema),
        defaultValues: getTaskFormDefaultValues(task),
        mode: 'onChange',
    });

    const handleSubmit = form.handleSubmit(onSubmit);

    return (
        <form id={formId} className="space-y-5" onSubmit={handleSubmit}>
            <FieldGroup>
                <CustomTextareaField
                    id={`${formId}-title`}
                    label="Title"
                    placeholder="Enter task title"
                    registration={form.register('title')}
                    error={form.formState.errors.title}
                    serverErrors={actionState.fieldErrors?.title}
                    description="Short and clear task title."
                />

                <CustomTextareaField
                    id={`${formId}-description`}
                    label="Description"
                    placeholder="Describe the task"
                    registration={form.register('description')}
                    error={form.formState.errors.description}
                    serverErrors={actionState.fieldErrors?.description}
                    description="Add useful context for this task."
                />
                <div className="grid gap-4 md:grid-cols-2">
                    <Controller
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <Field data-invalid={Boolean(form.formState.errors.status)}>
                                <Label>Status</Label>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger
                                        aria-invalid={Boolean(form.formState.errors.status)}
                                    >
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={TASK_STATUS.TODO}>Todo</SelectItem>
                                        <SelectItem value={TASK_STATUS.IN_PROGRESS}>
                                            In progress
                                        </SelectItem>
                                        <SelectItem value={TASK_STATUS.DONE}>Done</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FieldDescription>Choose the current task status.</FieldDescription>
                                <FieldError errors={[form.formState.errors.status]} />
                            </Field>
                        )}
                    />
                    <Controller
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                            <Field data-invalid={Boolean(form.formState.errors.priority)}>
                                <Label>Priority</Label>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger
                                        aria-invalid={Boolean(form.formState.errors.priority)}
                                    >
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={TASK_PRIORITY.LOW}>Low</SelectItem>
                                        <SelectItem value={TASK_PRIORITY.MEDIUM}>Medium</SelectItem>
                                        <SelectItem value={TASK_PRIORITY.HIGH}>High</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FieldDescription>Set how important this task is.</FieldDescription>
                                <FieldError errors={[form.formState.errors.priority]} />
                            </Field>
                        )}
                    />
                </div>

                <Field data-invalid={Boolean(form.formState.errors.deadline)}>
                    <FieldLabel htmlFor={`${formId}-deadline`}>Deadline</FieldLabel>
                    <Input
                        aria-label="Deadline"
                        id={`${formId}-deadline`}
                        type="date"
                        aria-invalid={Boolean(form.formState.errors.deadline)}
                        {...form.register('deadline')}
                    />
                    <FieldDescription>Leave empty if there is no deadline.</FieldDescription>
                    <FieldError errors={[form.formState.errors.deadline]} />
                </Field>

                <Controller
                    control={form.control}
                    name="isPrivate"
                    render={({ field }) => (
                        <Field
                            orientation="horizontal"
                            className="items-center justify-between rounded-xl border p-4"
                        >
                            <div className="space-y-1">
                                <FieldLabel>Private task</FieldLabel>
                                <FieldDescription>
                                    Restrict visibility of this task.
                                </FieldDescription>
                            </div>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </Field>
                    )}
                />
            </FieldGroup>

            <Button type="submit" className="hidden" disabled={isPending}>
                {submitLabel}
            </Button>
        </form>
    );
}
