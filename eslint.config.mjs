import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,

    {
        files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
        rules: {
            'react/react-in-jsx-scope': 'off',
            '@typescript-eslint/no-empty-object-type': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            'react/prop-types': 'off',
        },
    },

    {
        files: ['**/*.config.{js,mjs,ts}', '**/next.config.{js,mjs,ts}'],
        rules: {
            'import/no-default-export': 'off',
        },
    },

    prettier,

    globalIgnores([
        '.next/**',
        'out/**',
        'build/**',
        'dist/**',
        'coverage/**',
        'next-env.d.ts',
        'node_modules/**',
    ]),
]);

export default eslintConfig;
