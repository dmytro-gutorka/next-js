import { RegistrationPage } from '@/features/auth/index.ui';
import { redirectIfAuthenticated } from '@/features/auth/index.server';

async function RegistrationRoutePage() {
    await redirectIfAuthenticated();

    return <RegistrationPage />;
}

export default RegistrationRoutePage;
