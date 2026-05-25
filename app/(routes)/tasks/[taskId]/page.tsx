import { TaskDetailsPage } from '@/features/tasks/ui/task-details-page';

interface TaskDetailsRoutePageProps {
    params: Promise<{ taskId: string }>;
}

async function TaskDetailsRoutePage({ params }: TaskDetailsRoutePageProps) {
    const { taskId } = await params;

    return <TaskDetailsPage taskId={taskId} />;
}

export default TaskDetailsRoutePage;
