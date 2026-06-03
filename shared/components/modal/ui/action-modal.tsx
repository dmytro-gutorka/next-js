'use client';

import { Loader2 } from 'lucide-react';
import type { ReactNode } from 'react';

import { Button } from '@/shared/lib/shadcn/components/ui/button';

import { BaseModal } from '../base-modal';
import type { BaseModalProps } from '../model/modal.types';

interface ActionModalProps extends BaseModalProps {
    children: ReactNode;
    isLoading?: boolean;
    submitFormId?: string;
    isSubmitDisabled?: boolean;
    isCancelDisabled?: boolean;
    submitLabel?: string | ReactNode;
    cancelLabel?: string | ReactNode;
    onSubmit?: () => unknown;
    onCancel?: () => void;
    contentClassName?: string;
}

export function ActionModal({
    open,
    onOpenChange,
    title,
    description,
    children,
    submitFormId,
    isLoading = false,
    isSubmitDisabled = false,
    isCancelDisabled = false,
    submitLabel = 'Submit',
    cancelLabel = 'Cancel',
    onSubmit,
    onCancel,
    contentClassName = 'sm:max-w-lg',
}: ActionModalProps) {
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
            contentClassName={contentClassName}
        >
            <div className="space-y-4">{children}</div>

            <div className="mt-6 flex justify-end gap-2">
                <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isCancelDisabled}
                >
                    {cancelLabel}
                </Button>

                <Button
                    type="submit"
                    variant="default"
                    form={submitFormId}
                    disabled={isSubmitDisabled}
                    onClick={() => onSubmit?.()}
                >
                    {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
                    {submitLabel}
                </Button>
            </div>
        </BaseModal>
    );
}
