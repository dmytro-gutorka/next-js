'use client';

import { Link2 } from 'lucide-react';

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/shared/lib/shadcn/components/ui/card';
import { GoogleAuthButton } from 'features/auth/ui/common/buttons/google-auth-button';

export function LinkGoogleCard() {
    return (
        <Card>
            <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2 text-sm font-medium">
                        <Link2 className="size-4" />
                        Link Google account
                    </CardTitle>
                    <CardDescription>
                        Connect a Google account to this profile. The Google email may be different
                        because you are already signed in to this account.
                    </CardDescription>
                </div>

                <div className="w-full md:max-w-64">
                    <GoogleAuthButton mode="link" />
                </div>
            </CardHeader>
        </Card>
    );
}
