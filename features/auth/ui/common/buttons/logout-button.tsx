import 'server-only';

import { LogOut } from 'lucide-react';
import { Button } from 'shared/lib/shadcn/components/ui/button';
import { logoutAction } from 'features/auth/actions/logout.action';

export function LogoutButton() {
    return (
        <form action={logoutAction}>
            <Button type="submit" variant="outline">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
            </Button>
        </form>
    );
}
