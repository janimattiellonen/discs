import { configureStore } from '@reduxjs/toolkit';

import discsReducer from '../ducks/discs';
import imagesReducer from '../ducks/images';

export const store = configureStore({
    reducer: {
        discs: discsReducer,
        images: imagesReducer,
    },
});

// Export types for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
