'use client';

import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { updateTaskAction } from '@/features/tasks/index.actions';
import { Button } from '@/shared/lib/shadcn/components/ui/button';
import { DialogTrigger } from '@/shared/lib/shadcn/components/ui/dialog';
import type { Task, TaskFormValues } from '../../model/task.types';
import { TaskFormDialog } from './task-form-dialog';

interface EditTaskDialogProps {
    task: Task;
    size?: 'default' | 'icon';
}

export function EditTaskDialog({ task, size = 'icon' }: EditTaskDialogProps) {
    const [open, setOpen] = useState(false);

    async function handleSubmit(values: TaskFormValues) {
        return updateTaskAction(task.id, values);
    }

    return (
        <TaskFormDialog
            open={open}
            onOpenChange={setOpen}
            title="Edit task"
            description="Update task fields below."
            submitLabel="Save changes"
            formId={`edit-task-form-${task.id}`}
            task={task}
            onSubmit={handleSubmit}
            trigger={
                <DialogTrigger asChild>
                    <Button type="button" variant="outline" size={size} aria-label="Edit task">
                        <Pencil className={size === 'icon' ? 'size-4' : 'mr-2 size-4'} />
                        {size !== 'icon' && 'Edit'}
                    </Button>
                </DialogTrigger>
            }
        />
    );
}
