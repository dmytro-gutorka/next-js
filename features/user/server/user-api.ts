import 'server-only';

import { serverHttpClient } from '@/shared/server/api/server-http-client';
import type { UpdateMePayload, User, UserDto } from '../model/user.types';

export async function getMe(accessToken: string) {
    const response = await serverHttpClient.get<UserDto>('/users/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return mapUserDtoToUser(response.data);
}

export async function updateMe(accessToken: string, payload: UpdateMePayload) {
    const response = await serverHttpClient.patch<UserDto>(
        '/users/me',
        mapUpdateMePayload(payload),
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    );

    return mapUserDtoToUser(response.data);
}

export async function uploadAvatar(accessToken: string, formData: FormData) {
    const response = await serverHttpClient.post<UserDto>('/users/me/avatar', formData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return mapUserDtoToUser(response.data);
}

function mapUserDtoToUser(dto: UserDto): User {
    return {
        id: dto.id,
        email: dto.email,
        name: dto.name ?? '',
        surname: dto.surname ?? '',
        birthday: dto.birthday ? dto.birthday.slice(0, 10) : null,
        avatarUrl: dto.avatarUrl ?? null,
        lastLoginAt: dto.lastLoginAt,
        createdAt: dto.createdAt,
        updatedAt: dto.updatedAt,
    };
}

function mapUpdateMePayload(payload: UpdateMePayload) {
    return {
        name: payload.name?.trim(),
        surname: payload.surname?.trim(),
        birthday: payload.birthday || null,
    };
}
