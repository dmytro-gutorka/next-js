export type Nullable<T> = T | null;
export type ValueOf<T> = T[keyof T];

export type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export type CursorParam = Nullable<string>;

export interface CursorParams {
    cursor?: CursorParam;
    limit?: number;
}

export interface CursorPaginationResponse<TItem> {
    items: TItem[];
    nextCursor: CursorParam;
}
