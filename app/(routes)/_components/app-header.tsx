import { LogoutButton } from 'features/auth/ui/logout-button';
import { getAccessTokenCookie } from 'features/auth/server/session-cookies';

async function AppHeader() {
    const accessToken = await getAccessTokenCookie();

    return <header>{accessToken && <LogoutButton />}</header>;
}

export default AppHeader;
