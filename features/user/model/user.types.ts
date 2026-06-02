import type { Nullable } from '@/shared/types/common.types';

export type User = {
    id: number;
    email: string;
    name: string;
    surname: string;
    birthday: Nullable<string>;
    avatarUrl: Nullable<string>;
    lastLoginAt: Nullable<string>;
    createdAt: string;
    updatedAt: string;
};

export type UserDto = {
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

export type UpdateMePayload = {
    name?: string;
    surname?: string;
    birthday?: Nullable<string>;
};
