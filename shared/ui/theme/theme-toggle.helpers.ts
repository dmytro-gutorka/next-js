import type { ThemeValue } from 'shared/ui/theme/theme-toggle.types';
import { nextTheme } from 'shared/ui/theme/theme-toggle.constants';

export function isThemeValue(value: string): value is ThemeValue {
    return Object.values(nextTheme).includes(value as ThemeValue);
}
