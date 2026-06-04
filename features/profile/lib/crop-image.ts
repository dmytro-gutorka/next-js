import type { Area } from 'react-easy-crop';

export async function getCroppedImageFile(
    imageSrc: string,
    cropArea: Area,
    fileName: string,
    fileType: string,
) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
        throw new Error('Canvas context is not available.');
    }

    canvas.width = cropArea.width;
    canvas.height = cropArea.height;

    context.drawImage(
        image,
        cropArea.x,
        cropArea.y,
        cropArea.width,
        cropArea.height,
        0,
        0,
        cropArea.width,
        cropArea.height,
    );

    const blob = await getCanvasBlob(canvas, fileType);

    return new File([blob], fileName, { type: fileType });
}

function createImage(src: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', reject);
        image.src = src;
    });
}

function getCanvasBlob(canvas: HTMLCanvasElement, fileType: string) {
    return new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (!blob) {
                reject(new Error('Failed to crop image.'));
                return;
            }

            resolve(blob);
        }, fileType);
    });
}
