'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import { createTaskAction } from '@/features/tasks/index.actions';
import { Button } from '@/shared/lib/shadcn/components/ui/button';
import { DialogTrigger } from '@/shared/lib/shadcn/components/ui/dialog';
import type { TaskFormValues } from '../../model/task.types';
import { TaskFormDialog } from './task-form-dialog';

export function CreateTaskDialog() {
    const [open, setOpen] = useState(false);

    async function handleSubmit(values: TaskFormValues) {
        return createTaskAction(values);
    }

    return (
        <TaskFormDialog
            open={open}
            onOpenChange={setOpen}
            title="Create task"
            description="Fill in the fields below to create a new task."
            submitLabel="Create task"
            formId="create-task-form"
            onSubmit={handleSubmit}
            trigger={
                <DialogTrigger asChild>
                    <Button type="button">
                        <Plus className="mr-2 size-4" />
                        Create task
                    </Button>
                </DialogTrigger>
            }
        />
    );
}
