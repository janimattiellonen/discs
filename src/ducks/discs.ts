/* eslint-disable no-param-reassign */

import { add, isBefore } from 'date-fns';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import discApi from '../api/disc';
import { Disc, DiscFormData } from '../types';

interface DiscImage {
    id: string;
}

interface DiscValues {
    'HIO date': string;
    'HIO description': string;
    additional: string;
    broken: string;
    collection_item: string;
    color: string;
    donated: string;
    'Donation description': string;
    fade: string;
    favourite: string;
    for_sale: string;
    glide: string;
    glow: string;
    hole_in_one: string;
    huk: string;
    image: string | DiscImage[];
    in_the_bag: string;
    manufacturer: string;
    material: string;
    missing_description: string;
    missing: string;
    name: string;
    own_stamp: string;
    price: string;
    sold_at: string;
    sold_for: string;
    sold_to: string;
    sold: string;
    speed: string;
    stability: string;
    type: string;
    weight: string;
    [key: string]: unknown; // Allow additional properties
}

interface DiscData {
    manufacturers?: string[];
    types?: string[];
    [key: string]: unknown;
}

interface DiscsState {
    savedDiscId: string | null;
    disc: Partial<DiscValues>;
    discs: Disc[];
    stats: unknown; // TODO: Type properly - stats response structure
    data: DiscData | null;
    loadingDiscs: boolean;
    loadingDiscsFailed: boolean;
    loadingStats: boolean;
    loadingStatsFailed: boolean;
    limit: number;
    offset: number;
    total: number;
    count: number;
    skip: number;
    saved: boolean;
    status?: string;
}

interface AddDiscParams {
    data: DiscFormData;
    token: string;
}

interface UpdateDiscParams {
    id: string;
    data: Partial<DiscFormData>;
    token: string;
}

interface FetchDiscsParams {
    query?: unknown;
    limit?: number;
    offset?: number;
    order?: {
        column: string;
        mode: string;
    };
}

interface FetchDiscsPayload {
    discs: Disc[];
    total: number;
    limit?: number;
    offset?: number;
    count: number;
    skip: number;
}

interface RemoveDiscImageParams {
    id: string;
    imageId: string;
    token: string;
}

export const defaultDiscValues: DiscValues = {
    'HIO date': '',
    'HIO description': '',
    additional: '',
    broken: '',
    collection_item: '',
    color: '',
    donated: '',
    'Donation description': '',
    // dyeing_costs: '',
    fade: '',
    favourite: '',
    for_sale: '',
    glide: '',
    glow: '',
    hole_in_one: '',
    huk: '',
    image: '',
    in_the_bag: '',
    manufacturer: '',
    material: '',
    missing_description: '',
    missing: '',
    name: '',
    own_stamp: '',
    price: '',
    // profit: '',
    sold_at: '',
    sold_for: '',
    sold_to: '',
    sold: '',
    speed: '',
    stability: '',
    type: '',
    weight: '',
};

const initialState: DiscsState = {
    savedDiscId: null,
    disc: defaultDiscValues,
    discs: [],
    stats: {},
    data: null,
    loadingDiscs: false,
    loadingDiscsFailed: false,
    loadingStats: false,
    loadingStatsFailed: false,
    limit: 25,
    offset: 0,
    total: 0,
    count: 0,
    skip: 0,
    saved: false,
};

const invalidateCachedDiscData = (): void => {
    localStorage.removeItem('data');
    localStorage.removeItem('stats');
};

export const addNewDiscAsync = createAsyncThunk<AxiosResponse<Disc>, AddDiscParams>(
    'discs/addNewDisc',
    async ({ data, token }) => {
        const response = await discApi.addDisc(data, token);
        invalidateCachedDiscData();

        return response;
    },
);

export const updateDiscAsync = createAsyncThunk<AxiosResponse<Disc>, UpdateDiscParams>(
    'discs/updateDisc',
    async ({ id, data, token }) => {
        const response = await discApi.updateDisc(id, data, token);
        invalidateCachedDiscData();

        return response;
    },
);

export const fetchDiscStatsAsync = createAsyncThunk<unknown>('discs/fetchDiscStats', async () => {
    const raw = localStorage.getItem('stats');
    const cachedStats: { stats?: unknown; created?: string } | null = raw ? JSON.parse(raw) : null;

    if (cachedStats?.stats && cachedStats?.created) {
        const created = add(new Date(cachedStats.created), { hours: 24 });
        const isValidCache = !isBefore(created, new Date());

        if (isValidCache) {
            return cachedStats.stats;
        }
    }

    const response = await discApi.getStats();

    localStorage.setItem('stats', JSON.stringify({ created: new Date().toISOString(), stats: response }));

    return response;
});

export const fetchDiscDataAsync = createAsyncThunk<DiscData>('discs/fetchDiscData', async () => {
    const raw = localStorage.getItem('data');
    const cachedData: { data?: DiscData; created?: string } | null = raw ? JSON.parse(raw) : null;

    if (cachedData?.data && cachedData?.created) {
        const created = add(new Date(cachedData.created), { hours: 24 });
        const isValidCache = !isBefore(created, new Date());

        if (isValidCache) {
            return cachedData.data;
        }
    }

    const response = (await discApi.getData()) as DiscData;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sortedMaterials = [...((response as any)?.materials || [])].sort((a: any, b: any) => {
        if (a.name > b.name) {
            return 1;
        }

        if (a.name < b.name) {
            return -1;
        }

        return 0;
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (response as any).materials = sortedMaterials;

    localStorage.setItem('data', JSON.stringify({ created: new Date().toISOString(), data: response }));

    return response;
});

export const fetchDiscAsync = createAsyncThunk<Disc, string>('discs/fetchDisc', async (id) => {
    const response = await discApi.getDisc(id);

    return response.data;
});

export const fetchDiscsAsync = createAsyncThunk<FetchDiscsPayload, FetchDiscsParams>(
    'discs/fetchDiscs',
    async (params) => {
        const response = await discApi.getDiscs(params);

        const payload: FetchDiscsPayload = {
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

        return payload;
    },
);

export const removeDiscImage = createAsyncThunk<AxiosResponse | null, RemoveDiscImageParams>(
    'discs/removeDiscImage',
    async ({ id, imageId, token }) => {
        const response = await discApi.removeImageFromDisc(id, imageId, token);

        return response;
    },
);

const buildFromResponse = (responseData: Partial<Disc>): Partial<DiscValues> => {
    const obj: Partial<DiscValues> = {};

    const acceptedKeys = Object.keys(defaultDiscValues);

    acceptedKeys.forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((responseData as any)[key]) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            obj[key] = (responseData as any)[key];
        } else {
            obj[key] = '';
        }
    });

    return obj;
};

export const discsSlice = createSlice({
    name: 'discs',
    initialState,
    reducers: {
        markSavedAsAcknowledged: (state) => {
            state.saved = false;
        },
        resetDisc: (state) => {
            state.disc = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDiscAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDiscAsync.fulfilled, (state, action) => {
                const clonedData = { ...action.payload };

                const buildObj = buildFromResponse(clonedData);

                if (!!buildObj.image && !Array.isArray(buildObj.image)) {
                    buildObj.image = [buildObj.image] as unknown as string | DiscImage[];
                }

                if (buildObj.image && Array.isArray(buildObj.image)) {
                    buildObj.image = (buildObj.image as unknown as string[]).map((image: string) => {
                        const foo: DiscImage = { id: image };

                        return foo;
                    }) as unknown as string | DiscImage[];
                }

                state.disc = buildObj;
            })
            .addCase(fetchDiscsAsync.pending, (state) => {
                state.status = 'loading';
                state.loadingDiscs = true;
            })
            .addCase(fetchDiscsAsync.fulfilled, (state, action) => {
                state.discs = action.payload.discs;
                state.skip = action.payload.skip;
                state.offset = action.payload.offset;
                state.count = action.payload.count;
                state.total = action.payload.total;
                state.loadingDiscs = false;
            })
            .addCase(fetchDiscStatsAsync.pending, () => {})
            .addCase(fetchDiscStatsAsync.fulfilled, (state, action) => {
                state.stats = action.payload;
            })
            .addCase(fetchDiscDataAsync.pending, () => {})
            .addCase(fetchDiscDataAsync.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(addNewDiscAsync.pending, (state) => {
                state.saved = false;
            })
            .addCase(addNewDiscAsync.fulfilled, (state, action) => {
                // eslint-disable-next-line no-underscore-dangle
                state.savedDiscId = action.payload.data._id;
                state.saved = true;
            })
            .addCase(updateDiscAsync.pending, (state) => {
                state.saved = false;
            })
            .addCase(updateDiscAsync.fulfilled, (state) => {
                state.saved = true;
            });
    },
});

export const { markSavedAsAcknowledged, resetDisc } = discsSlice.actions;

export default discsSlice.reducer;
