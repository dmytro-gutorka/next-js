'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/shared/lib/shadcn/components/ui/button';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
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
import { Textarea } from 'shared/lib/shadcn/components/ui/textarea';
import { Switch } from 'shared/lib/shadcn/components/ui/switch';

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
                <Field
                    data-invalid={Boolean(
                        form.formState.errors.title || actionState.fieldErrors?.title,
                    )}
                >
                    <FieldLabel htmlFor={`${formId}-title`}>Title</FieldLabel>
                    <Input
                        aria-label="Title"
                        id={`${formId}-title`}
                        placeholder="Enter task title"
                        aria-invalid={Boolean(
                            form.formState.errors.title || actionState.fieldErrors?.title,
                        )}
                        {...form.register('title')}
                    />
                    <FieldDescription>Short and clear task title.</FieldDescription>
                    <FieldError
                        message={
                            form.formState.errors.title?.message ??
                            actionState.fieldErrors?.title?.[0]
                        }
                    />
                </Field>

                <Field
                    data-invalid={Boolean(
                        form.formState.errors.description || actionState.fieldErrors?.description,
                    )}
                >
                    <FieldLabel htmlFor={`${formId}-description`}>Description</FieldLabel>
                    <Textarea
                        aria-label="Description"
                        id={`${formId}-description`}
                        placeholder="Describe the task"
                        aria-invalid={Boolean(
                            form.formState.errors.description ||
                            actionState.fieldErrors?.description,
                        )}
                        {...form.register('description')}
                    />
                    <FieldDescription>Add useful context for this task.</FieldDescription>
                    <FieldError
                        message={
                            form.formState.errors.description?.message ??
                            actionState.fieldErrors?.description?.[0]
                        }
                    />
                </Field>

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
                                <FieldError message={form.formState.errors.status?.message} />
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
                                <FieldError message={form.formState.errors.priority?.message} />
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
                    <FieldError message={form.formState.errors.deadline?.message} />
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

function FieldError({ message }: { message?: string }) {
    if (!message) return null;

    return <p className="text-sm text-destructive">{message}</p>;
}
