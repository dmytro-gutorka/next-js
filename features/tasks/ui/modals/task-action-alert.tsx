import { Alert, AlertDescription, AlertTitle } from '@/shared/lib/shadcn/components/ui/alert';
import type { ActionState } from 'features/auth/model/auth.types';

interface TaskActionAlertProps {
    state: ActionState;
}

export function TaskActionAlert({ state }: TaskActionAlertProps) {
    if (!state.message) return null;

    return (
        <Alert variant={state.success ? 'default' : 'destructive'}>
            <AlertTitle>{state.success ? 'Success' : 'Error'}</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
        </Alert>
    );
}
