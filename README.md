# Taskify (Next.js App)

A modern task management application built with Next.js, featuring authentication, profile management, and task tracking.

## Overview

This project is a Next.js application that provides a comprehensive suite of features for user authentication, profile customization, and task management. It is designed with a feature-based architecture to ensure scalability and maintainability.

### Key Features
- **Authentication**: Secure login, registration, password reset, and Google OAuth integration.
- **Profile Management**: User profile details, preferences, and security settings.
- **Task Management**: Create, view, and manage tasks.
- **Internationalization**: Support for multiple languages using `i18next`.
- **Modern UI**: Built with Tailwind CSS 4, Radix UI, and Lucide icons, following Shadcn UI patterns.

## Stack

- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [Shadcn UI](https://ui.shadcn.com/) / [Radix UI](https://www.radix-ui.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **API Client**: [Axios](https://axios-http.com/)
- **I18n**: [i18next](https://www.i18next.com/)
- **Package Manager**: [npm](https://www.npmjs.com/)

## Requirements

- Node.js (Version compatible with Next.js 16)
- npm (comes with Node.js)

## Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd next-js-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file in the root directory and add the necessary environment variables (see [Environment Variables](#environment-variables) section).

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Creates an optimized production build.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run lint-fix`: Runs ESLint and automatically fixes fixable issues.
- `npm run check:types`: Runs TypeScript compiler to check for type errors.
- `npm run format`: Formats the codebase using Prettier.
- `npm run format-check`: Checks if the codebase follows Prettier formatting rules.
- `npm run all-fix`: A convenience script that runs `lint-fix`, `check:types`, and `format`.

## Environment Variables

The application requires the following environment variables. You can find them in your `.env` or create a `.env.local` for local development.

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `NEXT_BACKEND_API_URL` | Base URL for the backend API | `http://localhost:5001/api/v1` |
| `NEXT_BACKEND_TIMEOUT` | API request timeout in milliseconds | `10000` |
| `NEXT_ENABLE_CONSOLE_LOGS` | Enable or disable console logs | `true` |
| `NEXT_APP_NAME` | Name of the application | `taskify` |
| `NEXT_AUTH_ACCESS_TOKEN_TTL_SECONDS` | Access token Time-To-Live | `900` |
| `NEXT_AUTH_REFRESH_TOKEN_TTL_SECONDS` | Refresh token Time-To-Live | `86400` |
| `NEXT_GOOGLE_CLIENT_ID` | Google OAuth Client ID | `your-google-client-id` |

## Project Structure

The project follows a feature-based organization:

- `app/`: Next.js App Router routes and global assets.
  - `(routes)/`: Page components and API routes.
- `features/`: Domain-specific logic and UI components.
  - `auth/`: Authentication related logic (login, register, actions).
  - `profile/`: User profile management.
  - `tasks/`: Task management logic.
  - `user/`: Generic user logic.
- `shared/`: Reusable components, hooks, constants, and utilities used across features.
  - `lib/`: Core libraries (API client, shadcn components).
  - `ui/`: Generic UI components.
  - `server/`: Server-side utilities.
- `public/`: Static assets like images and fonts.

## Tests

TODO: Document test setup. (Playwright is present in `node_modules` but no configuration or test files were found in the root).

## License

TODO: Add license information.
