import { getTaskDetailsData } from '../server/get-task-details';
import { TaskDetailsCard } from './details/task-details-card';
import { TaskDetailsHeader } from './details/task-details-header';

interface TaskDetailsPageProps {
    taskId: string;
}

export async function TaskDetailsPage({ taskId }: TaskDetailsPageProps) {
    const task = await getTaskDetailsData(taskId);

    return (
        <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
            <TaskDetailsHeader />
            <TaskDetailsCard task={task} />
        </main>
    );
}
