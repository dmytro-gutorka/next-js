import { type RefObject, useEffect } from 'react';

interface UseIntersectionObserverParams {
    targetRef: RefObject<Element | null>;
    enabled: boolean;
    onIntersect: () => void;
    root?: Element | null;
    rootMargin?: string;
    threshold?: number;
}

export function useIntersectionObserver({
    targetRef,
    enabled,
    onIntersect,
    root = null,
    rootMargin = '300px',
    threshold = 0,
}: UseIntersectionObserverParams) {
    useEffect(() => {
        const target = targetRef.current;

        if (!enabled || !target) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) onIntersect();
            },
            { root, rootMargin, threshold },
        );

        observer.observe(target);

        return () => observer.disconnect();
    }, [enabled, onIntersect, root, rootMargin, targetRef, threshold]);
}
