/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { uploadImage } from '../api/image';

const initialState = {
    images: [],
    uploadedImages: [],
};

export const fetchLatestImagesAsync = createAsyncThunk('images/fetchLatestImages', async () => {
    // const response = await fetchLatestImages(token);
    // return response;
});

export const uploadImageAsync = createAsyncThunk('images/uploadImage', async (params) => {
    const { formData, token } = params;

    // eslint-disable-next-line no-unreachable
    const response = await uploadImage(formData, token);

    return response;
});

export const imagesSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {
        reorderImages: (state, action) => {
            // state.images = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(uploadImageAsync.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(uploadImageAsync.fulfilled, (state, action) => {
            state.uploadedImages = [];
            state.uploadedImages.push(...action.payload.ids);
        });
    },
});

export const { reorderImages } = imagesSlice.actions;

export default imagesSlice.reducer;
