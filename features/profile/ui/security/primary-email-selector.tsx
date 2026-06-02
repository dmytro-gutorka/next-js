'use client';

import type { PrimaryEmailOptionsResponse } from '@/features/auth/index.types';
import { CheckCircle2, Loader2, Mail } from 'lucide-react';
import { useActionState, useState, useTransition } from 'react';
import { initialAuthActionState } from 'shared/lib/server-actions/action-state';
import { Button } from '@/shared/lib/shadcn/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/shared/lib/shadcn/components/ui/card';
import { Label } from '@/shared/lib/shadcn/components/ui/label';
import { updatePrimaryEmailAction } from 'features/auth/index.actions';
import { SecurityPageAlert } from 'features/profile/ui/security/security-page-alers';
import type { Nullable } from 'shared/types/common.types';
import {
    SelectContent,
    SelectItem,
    Select,
    SelectTrigger,
    SelectValue,
} from '@/shared/lib/shadcn/components/ui/select';
import { Badge } from 'shared/lib/shadcn/components/ui/badge';

interface PrimaryEmailSelectorProps {
    options: Nullable<PrimaryEmailOptionsResponse>;
}
export function PrimaryEmailSelector({ options }: PrimaryEmailSelectorProps) {
    const [state, formAction, isActionPending] = useActionState(
        updatePrimaryEmailAction,
        initialAuthActionState,
    );
    const [isTransitionPending, startTransition] = useTransition();
    const [selectedEmail, setSelectedEmail] = useState<string>('');

    const emails = options?.emails ?? [];
    const primaryEmail = options?.primaryEmail ?? '';
    const currentSelectedEmail = selectedEmail ?? primaryEmail;

    const selectedEmailOption = emails.find(
        (emailOption) => emailOption.email === currentSelectedEmail,
    );

    const isPrimarySelected = currentSelectedEmail === primaryEmail;
    const isSubmitPending = isActionPending || isTransitionPending;
    const isSubmitDisabled = isSubmitPending || !currentSelectedEmail || isPrimarySelected;

    function handleSubmit() {
        if (!currentSelectedEmail || isPrimarySelected) {
            return;
        }

        const formData = new FormData();
        formData.set('email', currentSelectedEmail);

        startTransition(() => {
            formAction(formData);
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                    <Mail className="size-4" />
                    Primary email
                </CardTitle>
                <CardDescription>
                    Choose which linked email should be displayed in the app and used as your main
                    contact email.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <SecurityPageAlert message={state.message} isSuccess={state.success} />

                {!emails.length && (
                    <div className="rounded-md border border-dashed p-3 text-sm text-muted-foreground">
                        No linked emails were found for this account.
                    </div>
                )}

                {Boolean(emails.length) && (
                    <div className="space-y-3">
                        <div className="flex flex-col gap-3 md:flex-row md:items-end">
                            <div className="grid w-full gap-2 md:w-80">
                                <Label htmlFor="primaryEmail">Email</Label>

                                <Select
                                    value={currentSelectedEmail}
                                    onValueChange={setSelectedEmail}
                                >
                                    <SelectTrigger id="primaryEmail" className="w-full">
                                        <SelectValue placeholder="Select primary email" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {emails.map((emailOption) => (
                                            <SelectItem
                                                key={emailOption.email}
                                                value={emailOption.email}
                                            >
                                                {emailOption.email}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button
                                type="button"
                                disabled={isSubmitDisabled}
                                onClick={handleSubmit}
                            >
                                {isSubmitPending ? (
                                    <Loader2 className="mr-2 size-4 animate-spin" />
                                ) : (
                                    <CheckCircle2 className="mr-2 size-4" />
                                )}
                                Set as primary
                            </Button>
                        </div>

                        {selectedEmailOption && (
                            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                <span>Linked providers:</span>

                                {selectedEmailOption.providers.map((provider) => (
                                    <Badge key={provider} variant="outline" className="capitalize">
                                        {provider}
                                    </Badge>
                                ))}

                                {selectedEmailOption.isPrimary && (
                                    <Badge variant="secondary">Current primary</Badge>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
