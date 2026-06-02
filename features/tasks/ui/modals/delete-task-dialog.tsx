'use client';

import { Loader2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { AppRoutes } from '@/shared/config/app-routes';
import { deleteTaskAction } from '@/features/tasks/index.actions';
import { Button } from '@/shared/lib/shadcn/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/shared/lib/shadcn/components/ui/dialog';
import type { Task } from '../../model/task.types';
import { TaskActionAlert } from './task-action-alert';
import { useRouter } from 'next/navigation';
import type { ActionState } from 'features/auth/model/auth.types';
import { initialActionState } from 'shared/lib/server-actions/action-state';

interface DeleteTaskDialogProps {
    task: Task;
    size?: 'default' | 'icon';
    redirectAfterDelete?: boolean;
}

export function DeleteTaskDialog({
    task,
    size = 'icon',
    redirectAfterDelete = false,
}: DeleteTaskDialogProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [actionState, setActionState] = useState<ActionState>(initialActionState);

    async function handleDelete() {
        setIsPending(true);

        try {
            const result = await deleteTaskAction(task.id);

            setActionState(result);

            if (result.success) {
                setOpen(false);
                setActionState(initialActionState);

                if (redirectAfterDelete) router.replace(AppRoutes.tasks);
            }
        } finally {
            setIsPending(false);
        }
    }

    function handleOpenChange(nextOpen: boolean) {
        if (isPending) return;

        setOpen(nextOpen);

        if (!nextOpen) setActionState(initialActionState);
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button type="button" variant="destructive" size={size} aria-label="Delete task">
                    <Trash2 className={size === 'icon' ? 'size-4' : 'mr-2 size-4'} />
                    {size !== 'icon' && 'Delete'}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete task</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete “{task.title}”? This action cannot be
                        undone.
                    </DialogDescription>
                </DialogHeader>

                <TaskActionAlert state={actionState} />

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        disabled={isPending}
                        onClick={() => handleOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        disabled={isPending}
                        onClick={handleDelete}
                    >
                        {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
