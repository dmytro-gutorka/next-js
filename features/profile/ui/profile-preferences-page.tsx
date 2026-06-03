import {
    CardContent,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
} from 'shared/lib/shadcn/components/ui/card';

export function ProfilePreferencesPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Application preferences will be available here.</CardDescription>
            </CardHeader>

            <CardContent>
                <CardDescription>There are no configurable preferences yet.</CardDescription>
            </CardContent>
        </Card>
    );
}
