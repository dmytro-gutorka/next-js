import { z } from 'zod';

export const ProfileFormSchema = z.strictObject({
    name: z.string().trim().min(2, 'Name must be at least 2 characters'),
    surname: z.string().trim().min(2, 'Surname must be at least 2 characters'),
    birthday: z.string().refine((value) => {
        if (!value) return false;

        const timestamp = Date.parse(value);

        if (Number.isNaN(timestamp)) return false;

        const selectedDate = new Date(value);
        const today = new Date();

        selectedDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        return selectedDate <= today;
    }, 'Birthday must not be in the future'),
});

export const AvatarUploadSchema = z.strictObject({
    avatar: z.instanceof(File).refine((file) => file.size > 0, 'Avatar file is required'),
});
