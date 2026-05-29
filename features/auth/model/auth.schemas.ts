import { z } from 'zod';

export const SignInLocalSchema = z.strictObject({
    email: z.email('Email is not valid'),
    password: z.string().min(6, 'Min password length is 6'),
});

export const SignUpFormSchema = z
    .strictObject({
        email: z.email('Email is not valid'),
        password: z.string().min(6, 'Min password length is 6'),
        confirmPassword: z.string().min(6, 'Min password length is 6'),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export const SignUpLocalSchema = SignUpFormSchema.transform(({ email, password }) => ({
    email,
    password,
}));

export const ResetPasswordFormSchema = z
    .strictObject({
        newPassword: z.string().min(6, 'Min password length is 6'),
        confirmPassword: z.string().min(6, 'Min password length is 6'),
    })
    .refine(({ newPassword, confirmPassword }) => newPassword === confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export const ConfirmPasswordResetSchema = ResetPasswordFormSchema.and(
    z.strictObject({
        token: z.string().min(1, 'Reset token is required'),
    }),
);

export const SignInGoogleSchema = z.strictObject({
    credential: z.string().min(1, 'Google credential is required'),
});

export const SetLocalPasswordSchema = z
    .strictObject({
        password: z.string().min(6, 'Min password length is 6'),
        confirmPassword: z.string().min(6, 'Min password length is 6'),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export const UpdatePrimaryEmailSchema = z.strictObject({
    email: z.email('Email is not valid'),
});