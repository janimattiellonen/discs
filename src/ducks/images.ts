/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { uploadImage } from '../api/image';

interface ImagesState {
    images: string[];
    uploadedImages: string[];
    status?: string;
}

interface UploadImageParams {
    formData: FormData;
    token: string;
}

interface UploadImageResponse {
    id: string;
    url: string;
    ids?: string[]; // Optional since it may not always be present
    [key: string]: unknown; // Allow additional properties
}

const initialState: ImagesState = {
    images: [],
    uploadedImages: [],
};

export const fetchLatestImagesAsync = createAsyncThunk<void>('images/fetchLatestImages', async () => {
    // TODO: Implement image fetching
});

export const uploadImageAsync = createAsyncThunk<UploadImageResponse, UploadImageParams>(
    'images/uploadImage',
    async (params) => {
        const { formData, token } = params;

        const response = await uploadImage(formData, token);

        return response;
    },
);

export const imagesSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(uploadImageAsync.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(uploadImageAsync.fulfilled, (state, action) => {
            state.uploadedImages = [];
            if (action.payload.ids) {
                state.uploadedImages.push(...action.payload.ids);
            }
        });
    },
});

export default imagesSlice.reducer;
