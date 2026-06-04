import { TasksPage } from 'features/tasks/ui/tasks-page';
import type { TasksPageSearchParams } from 'features/tasks/model/task.types';

interface TasksRoutePageProps {
    searchParams: Promise<TasksPageSearchParams>;
}

async function TasksRoutePage({ searchParams }: TasksRoutePageProps) {
    const queryParams = await searchParams;

    return <TasksPage searchParams={queryParams} />;
}

export default TasksRoutePage;
