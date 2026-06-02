export type Nullable<T> = T | null;
export type ValueOf<T> = T[keyof T];

export type SearchParams = Promise<Record<string, string | string[] | undefined>>;
