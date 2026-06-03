'use client';

import type { ReactNode } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

interface RootProvidersProps {
    children: ReactNode;
}

export function RootProviders({ children }: RootProvidersProps) {
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    return (
        <>
            {googleClientId && (
                <GoogleOAuthProvider clientId={googleClientId}>{children}</GoogleOAuthProvider>
            )}
        </>
    );
}
