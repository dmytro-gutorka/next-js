import { Label } from 'shared/lib/shadcn/components/ui/label';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from 'shared/lib/shadcn/components/ui/select';

interface CustomSelectProps {
    label: string;
    value: string;
    options: Array<[string, string]>;
    onValueChange: (value: string) => void;
}

export function CustomSelect({ label, value, options, onValueChange }: CustomSelectProps) {
    return (
        <div className="grid gap-2">
            <Label>{label}</Label>
            <Select value={value} onValueChange={onValueChange}>
                <SelectTrigger>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {options.map(([optionValue, optionLabel]) => (
                        <SelectItem key={optionValue} value={optionValue}>
                            {optionLabel}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
