'use client';

import type { ReactNode } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/shared/lib/shadcn/components/ui/dialog';

import type { BaseModalProps } from './model/modal.types';

interface ModalProps extends BaseModalProps {
    contentClassName?: string;
    children?: ReactNode;
}

export function BaseModal({
    open,
    onOpenChange,
    title,
    description,
    children,
    contentClassName,
}: ModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={contentClassName}>
                <DialogHeader>
                    {title ? <DialogTitle>{title}</DialogTitle> : null}
                    {description ? <DialogDescription>{description}</DialogDescription> : null}
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
}
