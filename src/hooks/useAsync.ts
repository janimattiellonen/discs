import { useState, useCallback } from 'react';

export interface AsyncState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export interface UseAsyncReturn<T> extends AsyncState<T> {
    execute: (asyncFunction: () => Promise<T>) => Promise<T | null>;
    reset: () => void;
}

/**
 * Custom hook to handle async operations with loading/error states.
 * Replaces Redux Toolkit's createAsyncThunk for Context API usage.
 *
 * @example
 * const { data, loading, error, execute } = useAsync<Disc[]>();
 *
 * const fetchDiscs = useCallback(async () => {
 *   const result = await execute(() => discApi.getDiscs());
 *   if (result) {
 *     setDiscs(result);
 *   }
 * }, [execute]);
 */
export function useAsync<T>(): UseAsyncReturn<T> {
    const [state, setState] = useState<AsyncState<T>>({
        data: null,
        loading: false,
        error: null,
    });

    const execute = useCallback(async (asyncFunction: () => Promise<T>): Promise<T | null> => {
        setState({ data: null, loading: true, error: null });

        try {
            const data = await asyncFunction();
            setState({ data, loading: false, error: null });
            return data;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            setState({ data: null, loading: false, error: errorMessage });
            // eslint-disable-next-line no-console
            console.error('useAsync error:', error);
            return null;
        }
    }, []);

    const reset = useCallback(() => {
        setState({ data: null, loading: false, error: null });
    }, []);

    return {
        ...state,
        execute,
        reset,
    };
}
