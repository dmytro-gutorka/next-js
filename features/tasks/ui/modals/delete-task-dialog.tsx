'use client';

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { deleteTaskAction } from '@/features/tasks/index.actions';
import { AppRoutes } from '@/shared/config/app-routes';
import { useModalState, ConfirmationModal } from '@/shared/components/modal';
import { Button } from '@/shared/lib/shadcn/components/ui/button';
import type { ActionState } from '@/features/auth/model/auth.types';
import { initialActionState } from '@/shared/lib/server-actions/action-state';

import type { Task } from '../../model/task.types';
import { TaskActionAlert } from './task-action-alert';

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
    const deleteModal = useModalState();
    const [isPending, setIsPending] = useState(false);
    const [actionState, setActionState] = useState<ActionState>(initialActionState);

    async function handleDelete() {
        setIsPending(true);

        try {
            const result = await deleteTaskAction(task.id);

            setActionState(result);

            if (result.success) {
                deleteModal.closeModal();
                setActionState(initialActionState);

                if (redirectAfterDelete) router.replace(AppRoutes.tasks);
            }
        } finally {
            setIsPending(false);
        }
    }

    function handleOpenChange(nextOpen: boolean) {
        if (isPending) return;

        deleteModal.setOpen(nextOpen);

        if (!nextOpen) setActionState(initialActionState);
    }

    return (
        <>
            <Button
                type="button"
                variant="destructive"
                size={size}
                aria-label="Delete task"
                onClick={deleteModal.openModal}
            >
                <Trash2 className={size === 'icon' ? 'size-4' : 'mr-2 size-4'} />
                {size !== 'icon' && 'Delete'}
            </Button>

            <ConfirmationModal
                open={deleteModal.open}
                onOpenChange={handleOpenChange}
                title="Delete task"
                description={`Are you sure you want to delete “${task.title}”?`}
                confirmLabel="Delete"
                cancelLabel="Cancel"
                confirmVariant="destructive"
                isLoading={isPending}
                onConfirm={handleDelete}
            >
                <TaskActionAlert state={actionState} />
            </ConfirmationModal>
        </>
    );
}
