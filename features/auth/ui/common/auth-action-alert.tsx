import { Alert, AlertDescription } from '@/shared/lib/shadcn/components/ui/alert';

import type { AuthActionState } from '../../model/auth.types';

interface AuthActionAlertProps {
    state: AuthActionState;
}

export function AuthActionAlert({ state }: AuthActionAlertProps) {
    if (!state.message) return null;

    return (
        <Alert variant={state.success ? 'default' : 'destructive'}>
            <AlertDescription>{state.message}</AlertDescription>
        </Alert>
    );
}
