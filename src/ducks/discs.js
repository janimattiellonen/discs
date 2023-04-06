/* eslint-disable no-param-reassign */

import { add, isBefore } from 'date-fns';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import discApi from '../api/disc';

export const defaultDiscValues = {
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

const initialState = {
    savedDiscId: null,
    disc: defaultDiscValues,
    discs: [],
    stats: {},
    data: {},
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

const invalidateCachedDiscData = () => {
    localStorage.removeItem('data');
    localStorage.removeItem('stats');
};

export const addNewDiscAsync = createAsyncThunk('discs/addNewDisc', async ({ data, token }) => {
    const response = await discApi.addDisc(data, token);
    invalidateCachedDiscData();

    return response;
});

export const updateDiscAsync = createAsyncThunk('discs/updateDisc', async ({ id, data, token }) => {
    const response = await discApi.updateDisc(id, data, token);
    invalidateCachedDiscData();

    return response;
});

export const fetchDiscStatsAsync = createAsyncThunk('discs/fetchDiscStats', async () => {
    const raw = localStorage.getItem('stats');
    const cachedStats = raw ? JSON.parse(raw) : null;

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

export const fetchDiscDataAsync = createAsyncThunk('discs/fetchDiscData', async () => {
    const raw = localStorage.getItem('data');
    const cachedData = raw ? JSON.parse(raw) : null;

    if (cachedData?.data && cachedData?.created) {
        const created = add(new Date(cachedData.created), { hours: 24 });
        const isValidCache = !isBefore(created, new Date());

        if (isValidCache) {
            return cachedData.data;
        }
    }

    const response = await discApi.getData();

    const sortedMaterials = [...(response?.materials || [])].sort((a, b) => {
        if (a.name > b.name) {
            return 1;
        }

        if (a.name < b.name) {
            return -1;
        }

        return 0;
    });

    response.materials = sortedMaterials;

    localStorage.setItem('data', JSON.stringify({ created: new Date().toISOString(), data: response }));

    return response;
});

export const fetchDiscAsync = createAsyncThunk('discs/fetchDisc', async (id) => {
    const response = await discApi.getDisc(id);

    return response.data;
});

export const fetchDiscsAsync = createAsyncThunk('discs/fetchDiscs', async (params) => {
    const response = await discApi.getDiscs(params);

    const payload = {
        discs: response.data,
        total: response.totals.total,
        limit: params.limit,
        offset: params.offset,
        count: response.totals.count,
        skip: response.totals.skip,
    };

    return payload;
});

export const removeDiscImage = createAsyncThunk('discs/removeDiscImage', async ({ id, imageId, token }) => {
    const response = await discApi.removeImageFromDisc(id, imageId, token);

    return response;
});

const buildFromResponse = (responseData) => {
    const obj = {};

    const acceptedKeys = Object.keys(defaultDiscValues);

    acceptedKeys.forEach((key) => {
        if (responseData[key]) {
            obj[key] = responseData[key];
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
                    buildObj.image = [buildObj.image];
                }

                if (buildObj.image) {
                    buildObj.image = buildObj.image.map((image) => {
                        const foo = { id: image };

                        return foo;
                    });
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
