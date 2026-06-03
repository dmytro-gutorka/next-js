'use client';

import { Pencil } from 'lucide-react';

import { updateTaskAction } from '@/features/tasks/index.actions';
import { Button } from '@/shared/lib/shadcn/components/ui/button';
import { useModalState } from '@/shared/components/modal';

import type { Task, TaskFormValues } from '../../model/task.types';
import { TaskFormDialog } from './task-form-dialog';

interface EditTaskDialogProps {
    task: Task;
    size?: 'default' | 'icon';
}

export function EditTaskDialog({ task, size = 'icon' }: EditTaskDialogProps) {
    const editModal = useModalState();

    async function handleSubmit(values: TaskFormValues) {
        return updateTaskAction(task.id, values);
    }

    return (
        <>
            <Button
                type="button"
                variant="outline"
                size={size}
                aria-label="Edit task"
                onClick={editModal.openModal}
            >
                <Pencil className={size === 'icon' ? 'size-4' : 'mr-2 size-4'} />
                {size !== 'icon' && 'Edit'}
            </Button>

            <TaskFormDialog
                open={editModal.open}
                onOpenChange={editModal.setOpen}
                title="Edit task"
                description="Update task fields below."
                submitLabel="Save changes"
                formId={`edit-task-form-${task.id}`}
                task={task}
                onSubmit={handleSubmit}
            />
        </>
    );
}
