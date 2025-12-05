// Core domain entities
export interface Disc {
    _id: string;
    id?: string;
    name: string;
    manufacturer: string;
    type: string;
    speed: number;
    glide: number;
    turn: number;
    fade: number;
    stability?: number;
    plastic?: string;
    material?: string;
    color?: string;
    weight?: number;
    condition?: string;
    purchaseDate?: string;
    purchasePrice?: number;
    status?: 'active' | 'lost' | 'sold' | 'donated';
    notes?: string;
    images?: string[];
    image?: string | string[];
    createdAt?: string;
    updatedAt?: string;
    missing?: boolean;
    broken?: boolean;
    sold?: boolean;
    donated?: boolean;
    sold_for?: number;
    price?: number;
    price_status?: 'gift' | 'price_unknown' | 'known';
    collection_item?: boolean;
    missing_description?: string;
    'Donation description'?: string;
    'Hole in one'?: boolean;
    'HIO date'?: string;
}

export interface Manufacturer {
    _id: string;
    name: string;
    country?: string;
    website?: string;
}

export interface DiscType {
    _id: string;
    name: string;
    description?: string;
}

export interface Image {
    _id: string;
    url: string;
    discId: string;
    order?: number;
    createdAt?: string;
}

// API response types
export interface ApiResponse<T> {
    data: T;
    status: number;
}

export interface ListResponse<T> {
    items: T[];
    total: number;
}

// Form types
export interface DiscFormData {
    name: string;
    manufacturer: string;
    type: string;
    speed: number;
    glide: number;
    turn: number;
    fade: number;
    plastic?: string;
    color?: string;
    weight?: number;
    condition?: string;
    purchaseDate?: string;
    purchasePrice?: number;
    status?: string;
    notes?: string;
}

// Redux state types
export interface DiscsState {
    items: Disc[];
    loading: boolean;
    error: string | null;
    selectedDisc: Disc | null;
}

export interface ManufacturersState {
    items: Manufacturer[];
    loading: boolean;
    error: string | null;
}

export interface TypesState {
    items: DiscType[];
    loading: boolean;
    error: string | null;
}

export interface ImagesState {
    items: Image[];
    loading: boolean;
    error: string | null;
}
