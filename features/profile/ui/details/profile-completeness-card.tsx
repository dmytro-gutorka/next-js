import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/shared/lib/shadcn/components/ui/card';

interface ProfileCompletenessCardProps {
    value: number;
}

export function ProfileCompletenessCard({ value }: ProfileCompletenessCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium">Profile completeness</CardTitle>
                <CardDescription>
                    Complete your profile to make your account easier to identify.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${value}%` }}
                    />
                </div>
                <p className="text-sm text-muted-foreground">{value}% complete</p>
            </CardContent>
        </Card>
    );
}
