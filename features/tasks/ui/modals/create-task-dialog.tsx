'use client';

import { Plus } from 'lucide-react';

import { createTaskAction } from '@/features/tasks/index.actions';
import { Button } from '@/shared/lib/shadcn/components/ui/button';
import { useModalState } from '@/shared/components/modal';

import type { TaskFormValues } from '../../model/task.types';
import { TaskFormDialog } from './task-form-dialog';

export function CreateTaskDialog() {
    const createModal = useModalState();

    async function handleSubmit(values: TaskFormValues) {
        return createTaskAction(values);
    }

    return (
        <>
            <Button type="button" onClick={createModal.openModal}>
                <Plus className="mr-2 size-4" />
                Create task
            </Button>

            <TaskFormDialog
                open={createModal.open}
                onOpenChange={createModal.setOpen}
                title="Create task"
                description="Fill in the fields below to create a new task."
                submitLabel="Create task"
                formId="create-task-form"
                onSubmit={handleSubmit}
            />
        </>
    );
}
