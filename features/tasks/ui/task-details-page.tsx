'use server';

interface TaskDetailsPageProps {
    taskId: string;
}

export async function TaskDetailsPage({ taskId }: TaskDetailsPageProps) {
    return (
        <main>
            <h1>Task Details</h1>
            <p>Task ID: {taskId}</p>
        </main>
    );
}
