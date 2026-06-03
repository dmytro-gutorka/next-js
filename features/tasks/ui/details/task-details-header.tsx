import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { AppRoutes } from '@/shared/config/app-routes';
import { Button } from '@/shared/lib/shadcn/components/ui/button';
import { TaskDetailsActions } from 'features/tasks/ui/details/task-details-actions';
import type { Task } from 'features/tasks/model/task.types';

interface TaskDetailsHeaderProps {
    task: Task;
}

export function TaskDetailsHeader({ task }: TaskDetailsHeaderProps) {
    return (
        <div className="flex items-center justify-between gap-4">
            <Button asChild variant="ghost">
                <Link href={AppRoutes.tasks}>
                    <ArrowLeft className="mr-2 size-4" />
                    Back to tasks
                </Link>
            </Button>

            <TaskDetailsActions task={task} />
        </div>
    );
}
