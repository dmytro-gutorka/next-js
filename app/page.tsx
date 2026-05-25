import { redirect } from 'next/navigation';
import { AppRoutes } from '@/shared/config/routes';

export default function HomePage() {
    redirect(AppRoutes.tasks);
}
