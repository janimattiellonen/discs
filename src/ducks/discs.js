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
};

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
    reducers: {},
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
                state.status = '';
            })
            .addCase(fetchDiscStatsAsync.pending, (state) => {})
            .addCase(fetchDiscStatsAsync.fulfilled, (state, action) => {
                state.stats = action.payload;
            })
            .addCase(fetchDiscDataAsync.pending, (state) => {})
            .addCase(fetchDiscDataAsync.fulfilled, (state, action) => {
                state.data = action.payload;
            });
    },
});

export default discsSlice.reducer;
