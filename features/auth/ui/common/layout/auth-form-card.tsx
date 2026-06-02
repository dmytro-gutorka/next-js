import type { ReactNode } from 'react';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from 'shared/lib/shadcn/components/ui/card';

interface AuthFormCardProps {
    title: string;
    description?: string;
    children: ReactNode;
}

export function AuthFormCard({ title, description, children }: AuthFormCardProps) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>

            <CardContent>{children}</CardContent>
        </Card>
    );
}
