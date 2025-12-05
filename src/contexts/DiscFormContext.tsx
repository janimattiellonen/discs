import React, { createContext, useContext, useState, useCallback, ReactNode, useMemo } from 'react';
import { AxiosResponse } from 'axios';

import { Disc } from '../types';
import { DiscFormContextType, ExtendedDiscFormData } from './types';
import { useAsync } from '../hooks/useAsync';
import discApi from '../api/disc';

const DiscFormContext = createContext<DiscFormContextType | undefined>(undefined);

interface DiscFormProviderProps {
    children: ReactNode;
}

// Default disc values structure (copied from Redux slice)
const defaultDiscValues: ExtendedDiscFormData = {
    'HIO date': '',
    'HIO description': '',
    additional: '',
    broken: '',
    collection_item: '',
    color: '',
    donated: '',
    'Donation description': '',
    fade: '',
    favourite: '',
    for_sale: '',
    glide: '',
    glow: '',
    hole_in_one: '',
    huk: '',
    in_the_bag: '',
    manufacturer: '',
    material: '',
    missing_description: '',
    missing: '',
    name: '',
    own_stamp: '',
    price: '',
    sold_at: '',
    sold_for: '',
    sold_to: '',
    sold: '',
    speed: '',
    stability: '',
    type: '',
    weight: '',
};

// Build disc form data from API response (copied from Redux slice)
const buildFromResponse = (responseData: Partial<Disc>): ExtendedDiscFormData => {
    const obj: ExtendedDiscFormData = {};
    const acceptedKeys = Object.keys(defaultDiscValues);

    acceptedKeys.forEach((key) => {
        const typedKey = key as keyof ExtendedDiscFormData;
        if ((responseData as Record<string, unknown>)[key]) {
            (obj as Record<string, unknown>)[key] = (responseData as Record<string, unknown>)[key];
        } else {
            (obj as Record<string, unknown>)[key] = '';
        }
    });

    return obj;
};

export function DiscFormProvider({ children }: DiscFormProviderProps): React.JSX.Element {
    const [disc, setDisc] = useState<ExtendedDiscFormData>(defaultDiscValues);
    const [savedDiscId, setSavedDiscId] = useState<string | null>(null);
    const [saved, setSaved] = useState<boolean>(false);

    const { loading, error, execute } = useAsync<AxiosResponse<Disc>>();

    // Fetch single disc by ID
    const fetchDisc = useCallback(
        async (id: string): Promise<void> => {
            const result = await execute(() => discApi.getDisc(id));

            if (result) {
                const clonedData = { ...result.data };
                const buildObj = buildFromResponse(clonedData);

                // Handle image field conversion (copied from Redux slice logic)
                if (buildObj.image && !Array.isArray(buildObj.image)) {
                    buildObj.image = [buildObj.image as string];
                }

                if (buildObj.image && Array.isArray(buildObj.image)) {
                    buildObj.image = (buildObj.image as string[]).map((image: string) => ({
                        id: image,
                    }));
                }

                setDisc(buildObj);
            }
        },
        [execute]
    );

    // Add new disc
    const addNewDisc = useCallback(
        async (data: ExtendedDiscFormData, token: string): Promise<void> => {
            setSaved(false);

            const result = await execute(() => discApi.addDisc(data as any, token));

            if (result) {
                // Invalidate localStorage cache
                localStorage.removeItem('data');
                localStorage.removeItem('stats');

                // eslint-disable-next-line no-underscore-dangle
                setSavedDiscId(result.data._id);
                setSaved(true);
            }
        },
        [execute]
    );

    // Update existing disc
    const updateDisc = useCallback(
        async (id: string, data: Partial<ExtendedDiscFormData>, token: string): Promise<void> => {
            setSaved(false);

            await execute(() => discApi.updateDisc(id, data as any, token));

            // Invalidate localStorage cache
            localStorage.removeItem('data');
            localStorage.removeItem('stats');

            setSaved(true);
        },
        [execute]
    );

    // Remove image from disc
    const removeDiscImage = useCallback(
        async (id: string, imageId: string, token: string): Promise<void> => {
            await execute(() => discApi.removeImageFromDisc(id, imageId, token) as Promise<AxiosResponse<Disc>>);
        },
        [execute]
    );

    // Reset disc to default values
    const resetDisc = useCallback(() => {
        setDisc(defaultDiscValues);
        setSavedDiscId(null);
        setSaved(false);
    }, []);

    // Mark saved state as acknowledged (clear save dialog)
    const markSavedAsAcknowledged = useCallback(() => {
        setSaved(false);
    }, []);

    const value = useMemo(
        () => ({
            disc,
            savedDiscId,
            saved,
            loading,
            error,
            fetchDisc,
            addNewDisc,
            updateDisc,
            removeDiscImage,
            resetDisc,
            markSavedAsAcknowledged,
        }),
        [disc, savedDiscId, saved, loading, error, fetchDisc, addNewDisc, updateDisc, removeDiscImage, resetDisc, markSavedAsAcknowledged]
    );

    return <DiscFormContext.Provider value={value}>{children}</DiscFormContext.Provider>;
}

export function useDiscForm(): DiscFormContextType {
    const context = useContext(DiscFormContext);
    if (!context) {
        throw new Error('useDiscForm must be used within a DiscFormProvider');
    }
    return context;
}
