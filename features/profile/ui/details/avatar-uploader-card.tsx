'use client';

import Image from 'next/image';
import { Camera, Loader2, Upload } from 'lucide-react';
import { useActionState, useRef, useState, useTransition, type ChangeEvent } from 'react';
import { initialAuthActionState } from 'shared/lib/server-actions/action-state';
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

interface AvatarUploaderCardProps {
    user: User;
}

export function AvatarUploaderCard({ user }: AvatarUploaderCardProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [state, formAction, isActionPending] = useActionState(
        uploadAvatarAction,
        initialAuthActionState,
    );
    const [isTransitionPending, startTransition] = useTransition();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const isSubmitting = isActionPending || isTransitionPending;
    const avatarUrl = previewUrl ?? user.avatarUrl;

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0] ?? null;

        setSelectedFile(file);

        if (previewUrl) URL.revokeObjectURL(previewUrl);

        setPreviewUrl(file ? URL.createObjectURL(file) : null);
    }

    function handleCancel() {
        if (previewUrl) URL.revokeObjectURL(previewUrl);

        setSelectedFile(null);
        setPreviewUrl(null);

        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }

    function handleSubmit() {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.set('avatar', selectedFile);

        startTransition(() => {
            formAction(formData);
            handleCancel();
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Avatar</CardTitle>
                <CardDescription>Upload a profile image for your account.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <CustomActionAlert state={state} />

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

                        <div className="flex flex-col gap-2 md:flex-row">
                            <Button
                                type="button"
                                disabled={!selectedFile || isSubmitting}
                                onClick={handleSubmit}
                            >
                                {isSubmitting ? (
                                    <Loader2 className="mr-2 size-4 animate-spin" />
                                ) : (
                                    <Upload className="mr-2 size-4" />
                                )}
                                Save avatar
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                disabled={!selectedFile || isSubmitting}
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
