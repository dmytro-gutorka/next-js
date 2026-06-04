import type { ThemeValue } from 'shared/ui/theme/theme-toggle.types';

export const nextTheme: Record<ThemeValue, ThemeValue> = {
    system: 'light',
    light: 'dark',
    dark: 'system',
} as const;
