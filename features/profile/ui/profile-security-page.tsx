import {
    CardDescription,
    CardTitle,
    CardHeader,
    Card,
    CardContent,
} from 'shared/lib/shadcn/components/ui/card';
import { SetLocalPasswordForm } from 'features/profile/ui/security/set-local-password-form';
import { PrimaryEmailSelector } from 'features/profile/ui/security/primary-email-selector';
import { RequestPasswordResetCard } from 'features/profile/ui/security/request-password-reset-card';
import { LinkGoogleCard } from 'features/profile/ui/security/link-google-card';
import { getPrimaryEmailOptions } from 'features/auth/server/auth-api';
import { getAccessTokenCookie } from 'features/auth/server/session-cookies';

export async function ProfileSecurityPage() {
    const accessToken = await getAccessTokenCookie();
    const primaryEmailOptions = await getPrimaryEmailOptions(accessToken!);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage account security actions.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <PrimaryEmailSelector options={primaryEmailOptions} />
                <RequestPasswordResetCard />
                <LinkGoogleCard />

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Set local password</CardTitle>
                        <CardDescription>
                            Use this if your account was created with Google and you want to also
                            sign in with email and password.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <SetLocalPasswordForm />
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}
