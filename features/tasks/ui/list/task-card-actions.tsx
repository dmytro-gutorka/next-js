import type { Task } from '../../model/task.types';
import { DeleteTaskDialog } from '../modals/delete-task-dialog';
import { EditTaskDialog } from '../modals/edit-task-dialog';

interface TaskCardActionsProps {
    task: Task;
}

export function TaskCardActions({ task }: TaskCardActionsProps) {
    return (
        <div
            className="flex shrink-0 items-center gap-2"
            onClick={(event) => event.stopPropagation()}
        >
            <EditTaskDialog task={task} />
            <DeleteTaskDialog task={task} />
        </div>
    );
}
