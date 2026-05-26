import { serverApiRequest } from '@/shared/api/server-api-client';

import type {
    ConfirmPasswordResetPayload,
    CurrentUser,
    MessageResponse,
    PrimaryEmailOptionsResponse,
    SetLocalPasswordPayload,
    SignInGooglePayload,
    SignInLocalPayload,
    SignUpLocalPayload,
    TokenResponse,
    UpdatePrimaryEmailPayload,
    UpdatePrimaryEmailResponse,
    AuthTokensResult,
} from '../model/auth.types';
import { getAuthTokensFromResponse } from '@/features/auth/server/getAuthTokensFromResponse';

export async function signInLocal(payload: SignInLocalPayload): Promise<AuthTokensResult> {
    const response = await serverApiRequest<TokenResponse>('/auth/sign-in', {
        method: 'POST',
        json: payload,
    });

    return getAuthTokensFromResponse(response.data, response.headers);
}

export async function signUpLocal(payload: SignUpLocalPayload): Promise<AuthTokensResult> {
    const response = await serverApiRequest<TokenResponse>('/auth/sign-up', {
        method: 'POST',
        json: payload,
    });

    return getAuthTokensFromResponse(response.data, response.headers);
}

export async function signInGoogle(payload: SignInGooglePayload): Promise<AuthTokensResult> {
    const response = await serverApiRequest<TokenResponse>('/auth/google', {
        method: 'POST',
        json: payload,
    });

    return getAuthTokensFromResponse(response.data, response.headers);
}

export async function refreshTokens(refreshToken: string): Promise<AuthTokensResult> {
    const response = await serverApiRequest<TokenResponse>('/auth/refresh', {
        method: 'GET',
        refreshToken,
    });

    return getAuthTokensFromResponse(response.data, response.headers);
}

export async function signOut(refreshToken: string): Promise<MessageResponse> {
    const response = await serverApiRequest<MessageResponse>('/auth/sign-out', {
        method: 'GET',
        refreshToken,
    });

    return response.data;
}

export async function getCurrentUser(accessToken: string): Promise<CurrentUser> {
    const response = await serverApiRequest<CurrentUser>('/users/me', {
        method: 'GET',
        accessToken,
        cache: 'no-store',
    });

    return response.data;
}

export async function requestPasswordReset(accessToken: string): Promise<MessageResponse> {
    const response = await serverApiRequest<MessageResponse>('/auth/password-reset/request', {
        method: 'POST',
        accessToken,
        json: {},
    });

    return response.data;
}

export async function confirmPasswordReset(
    payload: ConfirmPasswordResetPayload,
): Promise<MessageResponse> {
    const response = await serverApiRequest<MessageResponse>('/auth/password-reset/confirm', {
        method: 'POST',
        json: payload,
    });

    return response.data;
}

export async function linkGoogle(accessToken: string, payload: SignInGooglePayload) {
    const response = await serverApiRequest<MessageResponse>('/auth/google/link', {
        method: 'POST',
        accessToken,
        json: payload,
    });

    return response.data;
}

export async function setLocalPassword(accessToken: string, payload: SetLocalPasswordPayload) {
    const response = await serverApiRequest<MessageResponse>('/auth/local/set-password', {
        method: 'POST',
        accessToken,
        json: payload,
    });

    return response.data;
}

export async function getPrimaryEmailOptions(accessToken: string) {
    const response = await serverApiRequest<PrimaryEmailOptionsResponse>(
        '/auth/primary-email-options',
        {
            method: 'GET',
            accessToken,
            cache: 'no-store',
        },
    );

    return response.data;
}

export async function updatePrimaryEmail(accessToken: string, payload: UpdatePrimaryEmailPayload) {
    const response = await serverApiRequest<UpdatePrimaryEmailResponse>('/auth/primary-email', {
        method: 'PATCH',
        accessToken,
        json: payload,
    });

    return response.data;
}
