import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/shadcn/utils/utils';

interface TaskBadgeProps {
    children: ReactNode;
    className?: string;
}

export function TaskBadge({ children, className }: TaskBadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium',
                className,
            )}
        >
            {children}
        </span>
    );
}
