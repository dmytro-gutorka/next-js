'use client';

import {
    GoogleLogin,
    type CredentialResponse,
    type GsiButtonConfiguration,
} from '@react-oauth/google';
import { useState } from 'react';
import { googleSignInAction, linkGoogleAction } from 'features/auth/index.actions';
import { Alert, AlertDescription } from 'shared/lib/shadcn/components/ui/alert';
import type { ActionState } from 'features/auth/model/auth.types';
import { initialActionState } from 'shared/lib/server-actions/action-state';

interface GoogleAuthButtonProps {
    text?: GsiButtonConfiguration['text'];
    mode?: 'signIn' | 'link';
}

export function GoogleAuthButton({
    text = 'continue_with',
    mode = 'signIn',
}: GoogleAuthButtonProps) {
    const [actionState, setActionState] = useState<ActionState>(initialActionState);

    const action = mode === 'link' ? linkGoogleAction : googleSignInAction;
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    async function handleSuccess(credentialResponse: CredentialResponse) {
        if (!credentialResponse.credential) return;

        const payload = {
            credential: credentialResponse.credential,
        };

        const result = await action(payload);

        setActionState(result);
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

            {actionState.message && (
                <Alert variant={actionState.success ? 'default' : 'destructive'}>
                    <AlertDescription>{actionState.message}</AlertDescription>
                </Alert>
            )}
        </div>
    );
}
