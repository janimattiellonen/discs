/* eslint-disable no-param-reassign */

import { add, isBefore } from 'date-fns';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import discApi from '../api/disc';

const initialState = {
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

export const addNewDiscAsync = createAsyncThunk('discs/addNewDisc', async (data) => {
    const response = await discApi.addDisc(data);
    invalidateCachedDiscData();

    return response;
});

export const fetchDiscStatsAsync = createAsyncThunk('discs/fetchDiscStats', async () => {
    const raw = localStorage.getItem('stats');
    const cachedStats = raw ? JSON.parse(raw) : null;

    if (cachedStats?.stats && cachedStats?.created) {
        const created = add(new Date(cachedStats.created), { minutes: 5 });
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
        const created = add(new Date(cachedData.created), { minutes: 5 });
        const isValidCache = !isBefore(created, new Date());

        if (isValidCache) {
            return cachedData.data;
        }
    }

    const response = await discApi.getData();

    const sorted = [...(response?.materials || [])].sort((a, b) => {
        if (a > b) {
            return 1;
        }

        if (a < b) {
            return -1;
        }

        return 0;
    });

    response.materials = sorted;

    localStorage.setItem('data', JSON.stringify({ created: new Date().toISOString(), data: response }));

    return response;
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

export const discsSlice = createSlice({
    name: 'discs',
    initialState,
    reducers: {
        markSavedAsAcknowledged: (state) => {
            state.saved = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDiscsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDiscsAsync.fulfilled, (state, action) => {
                state.discs = action.payload.discs;
                state.skip = action.payload.skip;
                state.offset = action.payload.offset;
                state.count = action.payload.count;
                state.total = action.payload.total;
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
            .addCase(addNewDiscAsync.fulfilled, (state) => {
                state.saved = true;
            });
    },
});

export const { markSavedAsAcknowledged } = discsSlice.actions;

export default discsSlice.reducer;
