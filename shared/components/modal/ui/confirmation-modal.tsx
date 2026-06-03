'use client';

import { AlertTriangle, Loader2 } from 'lucide-react';
import type { ReactNode } from 'react';

import { Button } from '@/shared/lib/shadcn/components/ui/button';

import { BaseModal } from '../base-modal';
import type { BaseModalProps } from '../model/modal.types';

interface ConfirmationModalProps extends BaseModalProps {
    confirmLabel?: string;
    cancelLabel?: string;
    confirmVariant?: 'default' | 'destructive';
    isLoading?: boolean;
    confirmationMessage?: string;
    onConfirm: () => Promise<void> | void;
    onCancel?: () => void;
    children?: ReactNode;
}

export function ConfirmationModal({
    open,
    onOpenChange,
    title,
    description,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    confirmVariant = 'destructive',
    isLoading = false,
    confirmationMessage = 'This action cannot be undone.',
    onConfirm,
    onCancel,
    children,
}: ConfirmationModalProps) {
    function handleCancel() {
        onCancel?.();
        onOpenChange(false);
    }

    return (
        <BaseModal
            open={open}
            onOpenChange={onOpenChange}
            title={title}
            description={description}
            contentClassName="sm:max-w-md"
        >
            {children}

            <div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-4">
                <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-500" />
                <p className="text-sm text-muted-foreground">{confirmationMessage}</p>
            </div>

            <div className="mt-6 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={handleCancel} disabled={isLoading}>
                    {cancelLabel}
                </Button>

                <Button
                    type="button"
                    variant={confirmVariant}
                    onClick={() => void onConfirm()}
                    disabled={isLoading}
                >
                    {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
                    {confirmLabel}
                </Button>
            </div>
        </BaseModal>
    );
}
