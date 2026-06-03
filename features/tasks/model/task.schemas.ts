import { z } from 'zod';
import { TASK_STATUS_OPTIONS, TASK_PRIORITY_OPTIONS } from 'features/tasks/model/task.constants';

const OptionalDateSchema = z
    .string()
    .refine((value) => !value || !Number.isNaN(Date.parse(value)), {
        message: 'Deadline must be a valid date.',
    });

export const TaskFormSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, 'Title is required.')
        .max(120, 'Title must be at most 120 characters.'),
    description: z
        .string()
        .trim()
        .min(1, 'Description is required.')
        .max(1000, 'Description must be at most 1000 characters.'),
    status: z.enum(TASK_STATUS_OPTIONS),
    priority: z.enum(TASK_PRIORITY_OPTIONS),
    deadline: OptionalDateSchema,
    isPrivate: z.boolean(),
});
