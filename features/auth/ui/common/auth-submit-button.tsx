import { Loader2 } from 'lucide-react';

import { Button } from '@/shared/lib/shadcn/components/ui/button';

interface AuthSubmitButtonProps {
    children: string;
    form: string;
    isPending: boolean;
}

export function AuthSubmitButton({ children, form, isPending }: AuthSubmitButtonProps) {
    return (
        <Button type="submit" form={form} disabled={isPending} className="w-full">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </Button>
    );
}
