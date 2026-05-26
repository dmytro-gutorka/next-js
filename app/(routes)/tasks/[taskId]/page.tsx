import { TaskDetailsPage } from '@/features/tasks/index.ui';

interface TaskDetailsRoutePageProps {
    params: Promise<{ taskId: string }>;
}

async function TaskDetailsRoutePage({ params }: TaskDetailsRoutePageProps) {
    const { taskId } = await params;

    return <TaskDetailsPage taskId={taskId} />;
}

export default TaskDetailsRoutePage;
