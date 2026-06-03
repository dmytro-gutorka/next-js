import type { ReactNode } from 'react';

interface AuthPageWrapperProps {
    children: ReactNode;
}

function AuthPageWrapper({ children }: AuthPageWrapperProps) {
    return (
        <main className="flex min-h-svh items-center justify-center px-4">
            <div className="w-full max-w-md space-y-4">{children}</div>
        </main>
    );
}

export default AuthPageWrapper;
