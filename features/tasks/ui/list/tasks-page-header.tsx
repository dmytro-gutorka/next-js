import { ClipboardList } from 'lucide-react';
import type { TasksQueryState } from '../../model/task.types';
import { Card, CardHeader, CardTitle, CardDescription } from 'shared/lib/shadcn/components/ui/card';

interface TasksPageHeaderProps {
    total: number;
    queryState: TasksQueryState;
}

export function TasksPageHeader({ total, queryState }: TasksPageHeaderProps) {
    const hasSearch = Boolean(queryState.search);

    return (
        <Card>
            <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2 text-2xl">
                        <ClipboardList className="size-5 text-muted-foreground" />
                        Tasks
                    </CardTitle>

                    <CardDescription>
                        {total} {total === 1 ? 'task' : 'tasks'} found
                        {hasSearch ? ` for “${queryState.search}”` : ''}.
                    </CardDescription>
                </div>
            </CardHeader>
        </Card>
    );
}
