interface ReadonlyFieldProps {
    label: string;
    value?: string | number | null;
}

export function ReadonlyField({ label, value }: ReadonlyFieldProps) {
    return (
        <div className="rounded-lg border bg-muted/30 p-3">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {label}
            </dt>
            <dd className="mt-1 text-sm">{value || '—'}</dd>
        </div>
    );
}
