'use client';

import { UserRound } from 'lucide-react';
import Link from 'next/link';
import { AppRoutes } from '@/shared/config/app-routes';
import { cn } from '@/shared/lib/shadcn/utils/utils';
import { usePathname } from 'shared/lib/i18n/i18n.navigation';

const tabs = [
    {
        href: AppRoutes.profileDetails,
        title: 'Profile',
        description: 'Basic user information',
    },
    {
        href: AppRoutes.profilePreferences,
        title: 'Preferences',
        description: 'Application settings',
    },
    {
        href: AppRoutes.profileSecurity,
        title: 'Security',
        description: 'Account security actions',
    },
];

export function ProfileNavigation() {
    const pathname = usePathname();

    return (
        <nav className="grid gap-2 md:grid-cols-3">
            {tabs.map((tab) => {
                const isActive = pathname === tab.href || pathname.startsWith(`${tab.href}/`);

                return (
                    <Link
                        key={tab.href}
                        href={tab.href}
                        className={cn(
                            'flex min-h-16 items-center gap-3 rounded-md border p-3 text-left text-sm transition-colors hover:bg-muted',
                            isActive && 'border-primary bg-muted',
                        )}
                    >
                        <UserRound className="size-4 shrink-0" />
                        <span className="flex min-w-0 flex-col">
                            <span className="font-medium">{tab.title}</span>
                            <span className="text-xs text-muted-foreground">{tab.description}</span>
                        </span>
                    </Link>
                );
            })}
        </nav>
    );
}
