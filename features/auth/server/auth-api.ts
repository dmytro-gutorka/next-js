import 'server-only';

import { serverHttpClient } from '@/shared/server/api/server-http-client';
import type {
    ConfirmPasswordResetPayload,
    CurrentUser,
    MessageResponse,
    PrimaryEmailOptionsResponse,
    SessionTokens,
    SetLocalPasswordPayload,
    SignInGooglePayload,
    SignInLocalPayload,
    SignUpLocalPayload,
    TokenResponse,
    UpdatePrimaryEmailPayload,
    UpdatePrimaryEmailResponse,
} from '../model/auth.types';
import { getAuthHeaders } from 'shared/lib/common/helpers/getAuthHeaders';

export async function signInLocal(payload: SignInLocalPayload): Promise<SessionTokens> {
    const response = await serverHttpClient.post<TokenResponse>('/auth/sign-in', payload);

    return {
        accessToken: response.data.accessToken,
    };
}

export async function signUpLocal(payload: SignUpLocalPayload): Promise<SessionTokens> {
    const response = await serverHttpClient.post<TokenResponse>('/auth/sign-up', payload);

    return {
        accessToken: response.data.accessToken,
    };
}

export async function signInGoogle(payload: SignInGooglePayload): Promise<SessionTokens> {
    const response = await serverHttpClient.post<TokenResponse>('/auth/google', payload);

    return {
        accessToken: response.data.accessToken,
    };
}

export async function getCurrentUser(accessToken: string): Promise<CurrentUser> {
    const response = await serverHttpClient.get<CurrentUser>('/users/me', {
        headers: getAuthHeaders(accessToken),
    });

    return response.data;
}

export async function requestPasswordReset(accessToken: string): Promise<MessageResponse> {
    const response = await serverHttpClient.post<MessageResponse>(
        '/auth/password-reset/request',
        {},
        {
            headers: getAuthHeaders(accessToken),
        },
    );

    return response.data;
}

export async function confirmPasswordReset(
    payload: ConfirmPasswordResetPayload,
): Promise<MessageResponse> {
    const response = await serverHttpClient.post<MessageResponse>(
        '/auth/password-reset/confirm',
        payload,
    );

    return response.data;
}

export async function linkGoogle(accessToken: string, payload: SignInGooglePayload) {
    const response = await serverHttpClient.post<MessageResponse>('/auth/google/link', payload, {
        headers: getAuthHeaders(accessToken),
    });

    return response.data;
}

export async function setLocalPassword(accessToken: string, payload: SetLocalPasswordPayload) {
    const response = await serverHttpClient.post<MessageResponse>(
        '/auth/local/set-password',
        payload,
        {
            headers: getAuthHeaders(accessToken),
        },
    );

    return response.data;
}

export async function getPrimaryEmailOptions(accessToken: string) {
    const response = await serverHttpClient.get<PrimaryEmailOptionsResponse>(
        '/auth/primary-email-options',
        {
            headers: getAuthHeaders(accessToken),
        },
    );

    return response.data;
}

export async function updatePrimaryEmail(accessToken: string, payload: UpdatePrimaryEmailPayload) {
    const response = await serverHttpClient.patch<UpdatePrimaryEmailResponse>(
        '/auth/primary-email',
        payload,
        {
            headers: getAuthHeaders(accessToken),
        },
    );

    return response.data;
}
