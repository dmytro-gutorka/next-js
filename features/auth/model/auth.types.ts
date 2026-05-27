import type { Nullable } from '@/shared/types/common.types';

export type AuthActionState = {
    success: boolean;
    message?: string;
    fieldErrors?: Record<string, string[]>;
};

export type SessionTokens = {
    accessToken: string;
};

export type TokenResponse = {
    accessToken: string;
};

export type MessageResponse = {
    message: string;
};

export type SignInLocalPayload = {
    email: string;
    password: string;
};

export type SignUpLocalPayload = SignInLocalPayload;

export type ConfirmPasswordResetPayload = {
    token: string;
    newPassword: string;
    confirmPassword: string;
};

export type SignInGooglePayload = {
    credential: string;
};

export type SetLocalPasswordPayload = {
    password: string;
    confirmPassword: string;
};

export type UpdatePrimaryEmailPayload = {
    email: string;
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
