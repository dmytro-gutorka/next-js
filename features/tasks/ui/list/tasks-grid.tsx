import type { Task } from '../../model/task.types';
import { TasksEmptyState } from './tasks-empty-state';
import { TaskCard } from './task-card';

interface TasksGridProps {
    tasks: Task[];
}

export function TasksGrid({ tasks }: TasksGridProps) {
    if (!tasks.length) return <TasksEmptyState />;

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    );
}
