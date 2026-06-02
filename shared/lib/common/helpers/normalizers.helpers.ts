export function normalizeEnumParam<TValue extends string>(
    value: string | string[] | undefined,
    allowedValues: readonly TValue[],
    fallback: TValue,
): TValue {
    const normalizedValue = normalizeStringParam(value, fallback);

    if (allowedValues.includes(normalizedValue as TValue)) return normalizedValue as TValue;

    return fallback;
}

export function normalizeStringParam(value: string | string[] | undefined, fallback: string) {
    if (Array.isArray(value)) return value[0] ?? fallback;

    return value ?? fallback;
}
