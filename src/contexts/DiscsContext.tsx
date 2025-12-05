import React, { createContext, useContext, useState, useCallback, ReactNode, useMemo } from 'react';
import { Disc } from '../types';
import { DiscsContextType, FetchDiscsParams, PaginationState } from './types';
import { useAsync } from '../hooks/useAsync';
import discApi from '../api/disc';

const DiscsContext = createContext<DiscsContextType | undefined>(undefined);

interface DiscsProviderProps {
    children: ReactNode;
}

export function DiscsProvider({ children }: DiscsProviderProps): React.JSX.Element {
    const [discs, setDiscs] = useState<Disc[]>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        limit: 25,
        offset: 0,
        total: 0,
        count: 0,
        skip: 0,
    });

    const { loading, error, execute } = useAsync<{
        discs: Disc[];
        total: number;
        limit?: number;
        offset?: number;
        count: number;
        skip: number;
    }>();

    const fetchDiscs = useCallback(
        async (params: FetchDiscsParams): Promise<void> => {
            const result = await execute(async () => {
                const response = await discApi.getDiscs(params);

                return {
                    discs: response.data,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    total: (response as any).totals.total,
                    limit: params.limit,
                    offset: params.offset,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    count: (response as any).totals.count,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    skip: (response as any).totals.skip,
                };
            });

            if (result) {
                setDiscs(result.discs);
                setPagination({
                    total: result.total,
                    limit: result.limit || 25,
                    offset: result.offset || 0,
                    count: result.count,
                    skip: result.skip,
                });
            }
        },
        [execute]
    );

    const value = useMemo(
        () => ({
            discs,
            pagination,
            loading,
            error,
            fetchDiscs,
        }),
        [discs, pagination, loading, error, fetchDiscs]
    );

    return <DiscsContext.Provider value={value}>{children}</DiscsContext.Provider>;
}

export function useDiscs(): DiscsContextType {
    const context = useContext(DiscsContext);
    if (!context) {
        throw new Error('useDiscs must be used within a DiscsProvider');
    }
    return context;
}
