import type { ReactNode } from 'react';

interface TaskMetadataCardProps {
    icon: ReactNode;
    label: string;
    value: string;
}

export function TaskMetadataCard({ icon, label, value }: TaskMetadataCardProps) {
    return (
        <div className="rounded-xl border p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                {icon}
                {label}
            </div>
            <p className="text-sm text-muted-foreground">{value}</p>
        </div>
    );
}
