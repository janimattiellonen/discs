import { Disc } from '../types';

// ============================================================================
// Shared Form Types
// ============================================================================

// Extended DiscFormData to include all fields from the original form
export interface ExtendedDiscFormData {
    'HIO date'?: string;
    'HIO description'?: string;
    additional?: string;
    broken?: string;
    collection_item?: string;
    color?: string;
    donated?: string;
    'Donation description'?: string;
    fade?: string | number;
    favourite?: string;
    for_sale?: string;
    glide?: string | number;
    glow?: string;
    hole_in_one?: string;
    huk?: string;
    in_the_bag?: string;
    manufacturer?: string;
    material?: string;
    missing_description?: string;
    missing?: string;
    name?: string;
    own_stamp?: string;
    price?: string | number;
    sold_at?: string;
    sold_for?: string | number;
    sold_to?: string;
    sold?: string;
    speed?: string | number;
    stability?: string | number;
    type?: string;
    weight?: string | number;
    image?: Array<{ id: string }> | string[];
}

// ============================================================================
// DiscsContext Types
// ============================================================================

export interface PaginationState {
    limit: number;
    offset: number;
    total: number;
    count: number;
    skip: number;
}

export interface FetchDiscsParams {
    query?: {
        type?: string | null;
        manufacturer?: string | null;
        available?: string | null;
        missing?: string | null;
        sold?: string | null;
        forSale?: string | null;
        broken?: string | null;
        donated?: string | null;
        collection?: string | null;
        ownStamp?: string | null;
        holeInOne?: string | null;
        latest?: string | null;
        name?: string | null;
        favourite?: string | null;
        glow?: string | null;
        huk?: string | null;
    };
    limit?: number;
    offset?: number;
    order?: {
        column: string;
        mode: string;
    };
}

export interface DiscsContextType {
    discs: Disc[];
    pagination: PaginationState;
    loading: boolean;
    error: string | null;
    fetchDiscs: (params: FetchDiscsParams) => Promise<void>;
}

// ============================================================================
// DiscFormContext Types
// ============================================================================

export interface DiscFormContextType {
    disc: ExtendedDiscFormData;
    savedDiscId: string | null;
    saved: boolean;
    loading: boolean;
    error: string | null;
    fetchDisc: (id: string) => Promise<void>;
    addNewDisc: (
        data: ExtendedDiscFormData | Record<string, unknown>,
        token: string,
    ) => Promise<void>;
    updateDisc: (
        id: string,
        data: Partial<ExtendedDiscFormData> | Record<string, unknown>,
        token: string,
    ) => Promise<void>;
    removeDiscImage: (
        id: string,
        imageId: string,
        token: string,
    ) => Promise<void>;
    resetDisc: () => void;
    markSavedAsAcknowledged: () => void;
}

// ============================================================================
// ReferenceDataContext Types
// ============================================================================

export interface Material {
    name: string;
    [key: string]: unknown;
}

export interface DiscStats {
    spentMoney?: number;
    allCount?: number;
    missingCount?: number;
    soldCount?: number;
    donatedCount?: number;
    brokenCount?: number;
    collectionItemCount?: number;
    ownStampCount?: number;
    holeInOneCount?: number;
    forSaleCount?: number;
    availableCount?: number;
    glowCount?: number;
    hukCount?: number;
    favouriteCount?: number;
    inTheBagCount?: number;
    [key: string]: number | undefined;
}

export interface ReferenceDataContextType {
    stats: DiscStats | null;
    manufacturers: string[];
    materials: string[];
    types: string[];
    loading: boolean;
    error: string | null;
    fetchStats: () => Promise<void>;
    fetchData: () => Promise<void>;
    invalidateCache: () => void;
}

// ============================================================================
// ImageUploadContext Types
// ============================================================================

export interface ImageUploadContextType {
    uploadedImages: string[];
    uploading: boolean;
    error: string | null;
    uploadImage: (formData: FormData, token: string) => Promise<void>;
    clearUploadedImages: () => void;
}
