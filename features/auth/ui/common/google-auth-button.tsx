'use client';

import {
    GoogleLogin,
    type CredentialResponse,
    type GsiButtonConfiguration,
} from '@react-oauth/google';
import { startTransition, useActionState } from 'react';
import { googleSignInAction, linkGoogleAction } from '@/features/auth/index.actions';
import { Alert, AlertDescription } from '@/shared/lib/shadcn/components/ui/alert';
import { initialAuthActionState } from 'shared/lib/server-actions/action-state';

interface GoogleAuthButtonProps {
    text?: GsiButtonConfiguration['text'];
    mode?: 'signIn' | 'link';
}

export function GoogleAuthButton({
    text = 'continue_with',
    mode = 'signIn',
}: GoogleAuthButtonProps) {
    const action = mode === 'link' ? linkGoogleAction : googleSignInAction;
    const [state, formAction] = useActionState(action, initialAuthActionState);
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    function handleSuccess(credentialResponse: CredentialResponse) {
        if (!credentialResponse.credential) return;

        const formData = new FormData();
        formData.set('credential', credentialResponse.credential);

        startTransition(() => {
            formAction(formData);
        });
    }

    if (!googleClientId) {
        return null;
    }

    return (
        <div className="space-y-3">
            <GoogleLogin
                shape="square"
                text={text}
                width="100%"
                onSuccess={handleSuccess}
                onError={() => undefined}
            />

            {state.message && (
                <Alert variant={state.success ? 'default' : 'destructive'}>
                    <AlertDescription>{state.message}</AlertDescription>
                </Alert>
            )}
        </div>
    );
}
