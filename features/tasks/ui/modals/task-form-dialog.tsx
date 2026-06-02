'use client';

import { Loader2 } from 'lucide-react';
import { type ReactNode, useState } from 'react';

import { Button } from '@/shared/lib/shadcn/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/shared/lib/shadcn/components/ui/dialog';
import type { Task, TaskFormValues } from '../../model/task.types';
import { TaskForm } from '../form/task-form';
import { TaskActionAlert } from './task-action-alert';
import type { ActionState } from 'features/auth/model/auth.types';
import { initialActionState } from 'shared/lib/server-actions/action-state';

interface TaskFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    submitLabel: string;
    formId: string;
    task?: Task;
    trigger?: ReactNode;
    onSubmit: (values: TaskFormValues) => Promise<ActionState>;
}

export function TaskFormDialog({
    open,
    onOpenChange,
    title,
    description,
    submitLabel,
    formId,
    task,
    trigger,
    onSubmit,
}: TaskFormDialogProps) {
    const [actionState, setActionState] = useState<ActionState>(initialActionState);
    const [isPending, setIsPending] = useState(false);

    async function handleSubmit(values: TaskFormValues) {
        setIsPending(true);

        try {
            const result = await onSubmit(values);

            setActionState(result);

            if (result.success) {
                onOpenChange(false);
                setActionState(initialActionState);
            }
        } finally {
            setIsPending(false);
        }
    }

    function handleOpenChange(nextOpen: boolean) {
        if (isPending) return;

        onOpenChange(nextOpen);

        if (!nextOpen) {
            setActionState(initialActionState);
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            {trigger}
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <TaskActionAlert state={actionState} />

                <TaskForm
                    formId={formId}
                    task={task}
                    actionState={actionState}
                    isPending={isPending}
                    submitLabel={submitLabel}
                    onSubmit={handleSubmit}
                />

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        disabled={isPending}
                        onClick={() => handleOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" form={formId} disabled={isPending}>
                        {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
                        {submitLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
