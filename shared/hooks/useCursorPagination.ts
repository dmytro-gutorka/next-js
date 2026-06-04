import {
    type Dispatch,
    type SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

import type {
    CursorPaginationResponse,
    CursorParam,
    CursorParams,
} from '@/shared/types/common.types';

export function useCursorPagination<
    RequestData,
    ResponseBody extends CursorPaginationResponse<RequestData>,
>(
    apiRequest: (params: Partial<CursorParams>) => Promise<ResponseBody>,
    setItems: Dispatch<SetStateAction<RequestData[]>>,
    enabled: boolean,
    limit = 10,
) {
    const [nextCursor, setNextCursor] = useState<CursorParam>(null);
    const [isFirstPageLoading, setIsFirstPageLoading] = useState(false);
    const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const requestIdRef = useRef(0);

    const hasNextPage = nextCursor !== null;

    useEffect(() => {
        if (!enabled) return;

        const requestId = requestIdRef.current + 1;
        requestIdRef.current = requestId;

        async function loadFirstPage() {
            try {
                setIsFirstPageLoading(true);
                setIsFetchingNextPage(false);
                setErrorMessage(null);
                setNextCursor(null);
                setItems([]);

                const page = await apiRequest({ cursor: null, limit });

                if (requestIdRef.current !== requestId) return;

                setItems(page.items);
                setNextCursor(page.nextCursor);
            } catch (error) {
                if (requestIdRef.current !== requestId) return;

                setErrorMessage(error instanceof Error ? error.message : 'Failed to load tasks.');
            } finally {
                if (requestIdRef.current === requestId) setIsFirstPageLoading(false);
            }
        }

        void loadFirstPage();
    }, [apiRequest, enabled, limit, setItems]);

    const fetchNextPage = useCallback(async () => {
        if (!nextCursor || isFetchingNextPage || isFirstPageLoading) return;

        const requestId = requestIdRef.current;

        try {
            setIsFetchingNextPage(true);
            setErrorMessage(null);

            const page = await apiRequest({ cursor: nextCursor, limit });

            if (requestIdRef.current !== requestId) return;

            setItems((prevItems) => [...prevItems, ...page.items]);
            setNextCursor(page.nextCursor);
        } catch (error) {
            if (requestIdRef.current !== requestId) return;

            setErrorMessage(error instanceof Error ? error.message : 'Failed to load more tasks.');
        } finally {
            if (requestIdRef.current === requestId) setIsFetchingNextPage(false);
        }
    }, [nextCursor, isFetchingNextPage, isFirstPageLoading, limit, apiRequest, setItems]);

    return {
        isFirstPageLoading,
        isFetchingNextPage,
        hasNextPage,
        errorMessage,
        fetchNextPage,
    };
}
