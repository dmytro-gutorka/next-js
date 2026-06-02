import type { ReactNode } from 'react';
import { ProfileNavigation } from 'features/profile/ui/common/profile-navigation';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from 'shared/lib/shadcn/components/ui/card';

interface ProfileLayoutProps {
    children: ReactNode;
}

export function ProfileLayout({ children }: ProfileLayoutProps) {
    return (
        <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 md:p-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
                <p className="text-sm text-muted-foreground">
                    Manage your profile information, preferences and account security.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Account settings</CardTitle>
                    <CardDescription>Choose the section you want to manage.</CardDescription>
                </CardHeader>

                <CardContent className="pb-6">
                    <ProfileNavigation />
                </CardContent>
            </Card>

            {children}
        </main>
    );
}
