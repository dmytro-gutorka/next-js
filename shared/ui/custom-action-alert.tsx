import type { ActionState } from 'features/auth/model/auth.types';
import { Alert, AlertDescription } from 'shared/lib/shadcn/components/ui/alert';

interface CustomActionAlertProps {
    state: ActionState;
}

export function CustomActionAlert({ state }: CustomActionAlertProps) {
    if (!state.message) return null;

    return (
        <Alert variant={state.success ? 'default' : 'destructive'}>
            <AlertDescription>{state.message}</AlertDescription>
        </Alert>
    );
}
