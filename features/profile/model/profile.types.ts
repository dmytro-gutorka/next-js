import type { z } from 'zod';
import type { AuthActionState } from '@/features/auth/index.types';
import type { ProfileFormSchema } from './profile.schemas';

export type ProfileFormValues = z.infer<typeof ProfileFormSchema>;
export type ProfileActionState = AuthActionState;
