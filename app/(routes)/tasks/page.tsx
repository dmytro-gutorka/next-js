import { TasksPage } from '@/features/tasks/index.ui';
import { requireAuth } from '@/features/auth/index.server';

async function TasksRoutePage() {
    await requireAuth();

    return <TasksPage />;
}

export default TasksRoutePage;
