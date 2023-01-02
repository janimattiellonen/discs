import { createAsyncThunk, createSlice, unwrapResult } from '@reduxjs/toolkit';

import { fetchLatestImages, uploadImage } from '../api/image';
import discApi from '../api/disc';

const initialState = {
    images: [],
};

export const fetchLatestImagesAsync = createAsyncThunk('images/fetchLatestImages', async (token) => {
    const response = await fetchLatestImages(token);

    console.log(`fetchLatestImagesAsync: ${JSON.stringify(response, null, 2)}`);

    return response;
});

export const uploadImageAsync = createAsyncThunk('images/uploadImage', async (formData, token) => {
    const response = await uploadImage(formData, token);

    return response;
});

export const imagesSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        console.log('imageSlice...');
        builder.addCase(uploadImageAsync.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(uploadImageAsync.fulfilled, (state, action) => {
            console.log(`PAYLOAD: ${JSON.stringify(action.payload, null, 2)}`);
            console.log('PAYLOAD');
            state.images = action.payload.ids;
        });
    },
});

export default imagesSlice.reducer;
