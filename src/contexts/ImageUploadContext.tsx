import React, { createContext, useContext, useState, useCallback, ReactNode, useMemo } from 'react';
import { ImageUploadContextType } from './types';
import { useAsync } from '../hooks/useAsync';
import * as imageApi from '../api/image';

const ImageUploadContext = createContext<ImageUploadContextType | undefined>(undefined);

interface ImageUploadProviderProps {
    children: ReactNode;
}

interface UploadImageResponse {
    id: string;
    url: string;
    ids?: string[];
    [key: string]: unknown;
}

export function ImageUploadProvider({ children }: ImageUploadProviderProps): React.JSX.Element {
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);

    const { loading: uploading, error, execute } = useAsync<UploadImageResponse>();

    // Upload one or multiple images
    const uploadImage = useCallback(
        async (formData: FormData, token: string): Promise<void> => {
            const result = await execute(() => imageApi.uploadImage(formData, token));

            if (result && result.ids) {
                // Append new image IDs to uploaded images list (from response.ids field)
                setUploadedImages((prev) => [...prev, ...result.ids!]);
            }
        },
        [execute]
    );

    // Clear uploaded images list (e.g., after form submission)
    const clearUploadedImages = useCallback(() => {
        setUploadedImages([]);
    }, []);

    const value = useMemo(
        () => ({
            uploadedImages,
            uploading,
            error,
            uploadImage,
            clearUploadedImages,
        }),
        [uploadedImages, uploading, error, uploadImage, clearUploadedImages]
    );

    return <ImageUploadContext.Provider value={value}>{children}</ImageUploadContext.Provider>;
}

export function useImageUpload(): ImageUploadContextType {
    const context = useContext(ImageUploadContext);
    if (!context) {
        throw new Error('useImageUpload must be used within an ImageUploadProvider');
    }
    return context;
}
