'use client';

import Image from 'next/image';
import { Camera, Loader2, Upload } from 'lucide-react';
import { type ChangeEvent, useRef, useState, useEffect } from 'react';
import { initialActionState } from 'shared/lib/server-actions/action-state';
import type { User } from '@/features/user/index.types';
import { Button } from '@/shared/lib/shadcn/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/shared/lib/shadcn/components/ui/card';
import { Input } from '@/shared/lib/shadcn/components/ui/input';

import { uploadAvatarAction } from '../../actions/upload-avatar.action';
import { getUserInitials } from '../../model/profile.helpers';
import { CustomActionAlert } from 'shared/ui/custom-action-alert';
import type { ActionState } from 'features/auth/model/auth.types';

interface AvatarUploaderCardProps {
    user: User;
}

export function AvatarUploaderCard({ user }: AvatarUploaderCardProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [actionState, setActionState] = useState<ActionState>(initialActionState);
    const [isPending, setIsPending] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const avatarUrl = previewUrl ?? user.avatarUrl;
    const canSubmit = Boolean(selectedFile) && !isPending;

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0] ?? null;

        setSelectedFile(file);
        setActionState(initialActionState);

        setPreviewUrl((currentPreviewUrl) => {
            if (currentPreviewUrl) URL.revokeObjectURL(currentPreviewUrl);

            return file ? URL.createObjectURL(file) : null;
        });
    }

    function clearSelection() {
        setSelectedFile(null);
        setPreviewUrl((currentPreviewUrl) => {
            if (currentPreviewUrl) URL.revokeObjectURL(currentPreviewUrl);

            return null;
        });

        if (inputRef.current) inputRef.current.value = '';
    }

    async function handleSubmit() {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.set('avatar', selectedFile);

        setIsPending(true);

        try {
            const result = await uploadAvatarAction(formData);

            setActionState(result);

            if (result.success) clearSelection();
        } finally {
            setIsPending(false);
        }
    }

    function handleCancel() {
        clearSelection();
        setActionState(initialActionState);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Avatar</CardTitle>
                <CardDescription>Upload a profile image for your account.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <CustomActionAlert state={actionState} />

                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <div className="relative flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-muted text-2xl font-semibold uppercase">
                        {avatarUrl ? (
                            <Image
                                src={avatarUrl}
                                alt="Profile avatar"
                                fill
                                sizes="96px"
                                className="object-cover"
                                unoptimized
                            />
                        ) : (
                            getUserInitials(user)
                        )}
                    </div>

                    <div className="flex flex-1 flex-col gap-3">
                        <Input
                            ref={inputRef}
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            onChange={handleFileChange}
                            aria-label="Upload avatar"
                        />

                        <p className="text-sm text-muted-foreground">
                            Supported formats: JPEG, PNG and WebP. Maximum size: 5MB.
                        </p>

                        {actionState.fieldErrors?.avatar?.map((error) => (
                            <p key={error} className="text-sm text-destructive">
                                {error}
                            </p>
                        ))}

                        <div className="flex flex-col gap-2 md:flex-row">
                            <Button type="button" disabled={!canSubmit} onClick={handleSubmit}>
                                {isPending ? (
                                    <Loader2 className="mr-2 size-4 animate-spin" />
                                ) : (
                                    <Upload className="mr-2 size-4" />
                                )}
                                Save avatar
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                disabled={!selectedFile || isPending}
                                onClick={handleCancel}
                            >
                                <Camera className="mr-2 size-4" />
                                Cancel selection
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
