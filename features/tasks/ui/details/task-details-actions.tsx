import type { Task } from '../../model/task.types';
import { DeleteTaskDialog } from '../modals/delete-task-dialog';
import { EditTaskDialog } from '../modals/edit-task-dialog';

interface TaskDetailsActionsProps {
    task: Task;
}

export function TaskDetailsActions({ task }: TaskDetailsActionsProps) {
    return (
        <div className="flex items-center gap-2">
            <EditTaskDialog task={task} size="default" />
            <DeleteTaskDialog task={task} redirectAfterDelete size="default" />
        </div>
    );
}
