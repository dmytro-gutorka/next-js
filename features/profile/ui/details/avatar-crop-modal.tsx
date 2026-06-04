'use client';

import Cropper, { type Area } from 'react-easy-crop';
import 'react-easy-crop/react-easy-crop.css';
import { ActionModal } from '@/shared/components/modal';

interface AvatarCropModalProps {
    open: boolean;
    imageSrc: string | null;
    isPending: boolean;
    onOpenChange: (open: boolean) => void;
    onCropComplete: (cropArea: Area) => void;
    onSubmit: () => void;
    zoom: number;
    onZoomChange: (zoom: number) => void;
    crop: { x: number; y: number };
    onCropChange: (crop: { x: number; y: number }) => void;
}

export function AvatarCropModal({
    open,
    imageSrc,
    isPending,
    onOpenChange,
    onCropComplete,
    onSubmit,
    zoom,
    onZoomChange,
    crop,
    onCropChange,
}: AvatarCropModalProps) {
    return (
        <ActionModal
            open={open}
            onOpenChange={onOpenChange}
            title="Crop avatar"
            description="Adjust the image before uploading it as your profile avatar."
            submitLabel="Save avatar"
            isLoading={isPending}
            isSubmitDisabled={isPending || !imageSrc}
            isCancelDisabled={isPending}
            onSubmit={onSubmit}
            contentClassName="sm:max-w-xl"
        >
            {imageSrc && (
                <div className="space-y-4">
                    <div className="relative h-72 overflow-hidden rounded-lg bg-muted">
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            cropShape="round"
                            showGrid={false}
                            onCropChange={onCropChange}
                            onZoomChange={onZoomChange}
                            onCropComplete={(_, croppedAreaPixels) =>
                                onCropComplete(croppedAreaPixels)
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm font-medium">Zoom</p>
                        <input
                            type="range"
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(event) => onZoomChange(Number(event.target.value))}
                            className="w-full accent-primary"
                        />
                    </div>
                </div>
            )}
        </ActionModal>
    );
}
