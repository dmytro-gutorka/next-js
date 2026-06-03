import { Alert, AlertDescription } from 'shared/lib/shadcn/components/ui/alert';
import { CheckCircle2 } from 'lucide-react';

interface SecurityPageAlertProps {
    message?: string;
    isSuccess?: boolean;
}

export function SecurityPageAlert({ message, isSuccess }: SecurityPageAlertProps) {
    if (!message) return null;

    return (
        <Alert variant={isSuccess ? 'default' : 'destructive'}>
            {isSuccess && <CheckCircle2 className="size-4" />}
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    );
}
