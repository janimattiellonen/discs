import React, { createContext, useContext, useState, useCallback, ReactNode, useMemo } from 'react';
import { add, isBefore } from 'date-fns';
import { ReferenceDataContextType, DiscStats, Material } from './types';
import { useAsync } from '../hooks/useAsync';
import discApi from '../api/disc';

const ReferenceDataContext = createContext<ReferenceDataContextType | undefined>(undefined);

interface ReferenceDataProviderProps {
    children: ReactNode;
}

export function ReferenceDataProvider({ children }: ReferenceDataProviderProps): React.JSX.Element {
    const [stats, setStats] = useState<DiscStats | null>(null);
    const [manufacturers, setManufacturers] = useState<string[]>([]);
    const [materials, setMaterials] = useState<string[]>([]);
    const [types, setTypes] = useState<string[]>([]);

    const { loading, error, execute } = useAsync<unknown>();

    // Invalidate localStorage cache (called after disc add/update)
    const invalidateCache = useCallback(() => {
        localStorage.removeItem('data');
        localStorage.removeItem('stats');
    }, []);

    // Fetch disc stats with 24-hour localStorage caching
    const fetchStats = useCallback(async (): Promise<void> => {
        const raw = localStorage.getItem('stats');
        const cachedStats: { stats?: DiscStats; created?: string } | null = raw ? JSON.parse(raw) : null;

        // Check if cached stats are valid (less than 24 hours old)
        if (cachedStats?.stats && cachedStats?.created) {
            const created = add(new Date(cachedStats.created), { hours: 24 });
            const isValidCache = !isBefore(created, new Date());

            if (isValidCache) {
                setStats(cachedStats.stats);
                return;
            }
        }

        // Fetch fresh stats from API
        const response = await execute(() => discApi.getStats());

        if (response) {
            localStorage.setItem(
                'stats',
                JSON.stringify({
                    created: new Date().toISOString(),
                    stats: response,
                }),
            );
            setStats(response as DiscStats);
        }
    }, [execute]);

    // Fetch reference data (manufacturers, materials, types) with 24-hour localStorage caching
    const fetchData = useCallback(async (): Promise<void> => {
        const raw = localStorage.getItem('data');
        const cachedData: {
            data?: { manufacturers?: string[]; materials?: Material[]; types?: string[] };
            created?: string;
        } | null = raw ? JSON.parse(raw) : null;

        // Check if cached data is valid (less than 24 hours old)
        if (cachedData?.data && cachedData?.created) {
            const created = add(new Date(cachedData.created), { hours: 24 });
            const isValidCache = !isBefore(created, new Date());

            if (isValidCache) {
                setManufacturers(cachedData.data.manufacturers || []);
                setTypes(cachedData.data.types || []);

                // Sort and extract material names
                const sortedMaterials = [...(cachedData.data.materials || [])].sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                });
                setMaterials(sortedMaterials.map((m) => m.name));
                return;
            }
        }

        // Fetch fresh reference data from API
        const response = await execute(() => discApi.getData());

        if (response) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const responseData = response as any;

            // Sort materials by name
            const sortedMaterials = [...(responseData.materials || [])].sort((a: Material, b: Material) => {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
            });

            const dataToCache = {
                manufacturers: responseData.manufacturers || [],
                materials: sortedMaterials,
                types: responseData.types || [],
            };

            localStorage.setItem(
                'data',
                JSON.stringify({
                    created: new Date().toISOString(),
                    data: dataToCache,
                }),
            );

            setManufacturers(dataToCache.manufacturers);
            setTypes(dataToCache.types);
            setMaterials(sortedMaterials.map((m: Material) => m.name));
        }
    }, [execute]);

    const value = useMemo(
        () => ({
            stats,
            manufacturers,
            materials,
            types,
            loading,
            error,
            fetchStats,
            fetchData,
            invalidateCache,
        }),
        [stats, manufacturers, materials, types, loading, error, fetchStats, fetchData, invalidateCache],
    );

    return <ReferenceDataContext.Provider value={value}>{children}</ReferenceDataContext.Provider>;
}

export function useReferenceData(): ReferenceDataContextType {
    const context = useContext(ReferenceDataContext);
    if (!context) {
        throw new Error('useReferenceData must be used within a ReferenceDataProvider');
    }
    return context;
}
