import { z } from 'zod';
import type { Nullable } from 'shared/types/common.types';
import {
    type SignInLocalSchema,
    ConfirmPasswordResetSchema,
    SignInGoogleSchema,
    SetLocalPasswordSchema,
    UpdatePrimaryEmailSchema,
    SignUpFormSchema,
    SignUpLocalSchema,
    ResetPasswordFormSchema,
} from 'features/auth/model/auth.schemas';

export type ActionState = {
    success: boolean;
    message?: string;
    fieldErrors?: Record<string, string[]>;
};

export type SessionTokens = {
    accessToken: string;
    refreshToken: string;
};

export type TokenResponse = {
    accessToken: string;
};

export type MessageResponse = {
    message: string;
};

export type CurrentUser = {
    id: number;
    email: string;
    name: Nullable<string>;
    surname: Nullable<string>;
    birthday: Nullable<string>;
    avatarUrl: Nullable<string>;
    lastLoginAt: Nullable<string>;
    createdAt: string;
    updatedAt: string;
};

export type AuthProvider = 'local' | 'google';

export type PrimaryEmailOption = {
    email: string;
    providers: AuthProvider[];
    isPrimary: boolean;
};

export type PrimaryEmailOptionsResponse = {
    primaryEmail: string;
    emails: PrimaryEmailOption[];
};

export type UpdatePrimaryEmailResponse = {
    message: string;
    primaryEmail: string;
};

export type SignInLocalPayload = z.infer<typeof SignInLocalSchema>;
export type SignUpLocalPayload = z.infer<typeof SignUpLocalSchema>;
export type SignUpFormValues = z.input<typeof SignUpFormSchema>;
export type ConfirmPasswordResetPayload = z.infer<typeof ConfirmPasswordResetSchema>;
export type SignInGooglePayload = z.infer<typeof SignInGoogleSchema>;
export type SetLocalPasswordPayload = z.infer<typeof SetLocalPasswordSchema>;
export type UpdatePrimaryEmailPayload = z.infer<typeof UpdatePrimaryEmailSchema>;
export type ResetPasswordFormValues = z.infer<typeof ResetPasswordFormSchema>;
