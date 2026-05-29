import { LogoutButton } from 'features/auth/ui/logout-button';
import { getCurrentUser } from 'features/auth/server/get-current-user';

async function AppHeader() {
    const isAuthenticated = await getCurrentUser();

    return <header>{isAuthenticated && <LogoutButton />}</header>;
}

export default AppHeader;
