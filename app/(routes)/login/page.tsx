import { LoginPage } from '@/features/auth/index.ui';
import { redirectIfAuthenticated } from '@/features/auth/index.server';

async function LoginRoutePage() {
    await redirectIfAuthenticated();

    return <LoginPage />;
}

export default LoginRoutePage;
