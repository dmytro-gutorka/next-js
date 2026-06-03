import type { TasksPageResponse, TasksQueryState } from '../../model/task.types';
import { TasksEmptyState } from './tasks-empty-state';
import { TaskCard } from './task-card';
import { TasksPagination } from 'features/tasks/ui/list/tasks-pagination';

interface TasksGridProps {
    tasksPage: TasksPageResponse;
    queryState: TasksQueryState;
}

export function TasksGrid({ tasksPage, queryState }: TasksGridProps) {
    if (!tasksPage.items.length) return <TasksEmptyState />;

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {tasksPage.items.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}

            <div className="col-span-full flex justify-center">
                <TasksPagination
                    queryState={queryState}
                    page={tasksPage.page}
                    totalPages={tasksPage.totalPages}
                />
            </div>
        </div>
    );
}
