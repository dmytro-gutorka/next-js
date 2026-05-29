import type { ReactNode } from 'react';
import AppHeader from 'app/(routes)/_components/app-header';

interface MainLayout {
    children: ReactNode;
}

function MainLayout({ children }: MainLayout) {

    return (
        <>
            <AppHeader />
            {children}
        </>
    );
}

export default MainLayout;
