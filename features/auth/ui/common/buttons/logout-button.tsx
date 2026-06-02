import 'server-only';

import { LogOut } from 'lucide-react';
import { logoutAction } from 'features/auth/index.actions';
import { Button } from 'shared/lib/shadcn/components/ui/button';

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
