import { ClipboardList } from 'lucide-react';
import {
    EmptyTitle,
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyDescription,
} from 'shared/lib/shadcn/components/ui/empty';

export function TasksEmptyState() {
    return (
        <Empty className="rounded-xl border border-dashed p-8">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <ClipboardList />
                </EmptyMedia>

                <EmptyTitle>No tasks found</EmptyTitle>

                <EmptyDescription>
                    Try changing search or filters, or create a new task later.
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    );
}
