import type { TasksPageSearchParams } from '../model/task.types';
import { getTasksPageData } from '../server/get-tasks-page';
import { TasksPageHeader } from './list/tasks-page-header';
import { TasksClientSection } from 'features/tasks/ui/list/tasks-client-section';

interface TasksPageProps {
    searchParams: TasksPageSearchParams;
}

export async function TasksPage({ searchParams }: TasksPageProps) {
    const { queryState, tasksPage } = await getTasksPageData(searchParams);

    return (
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
            <TasksPageHeader total={tasksPage.total} queryState={queryState} />
            <TasksClientSection tasksPage={tasksPage} queryState={queryState} />
        </main>
    );
}
