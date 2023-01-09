import { configureStore } from '@reduxjs/toolkit';

import discsReducer from '../ducks/discs';
import imagesReducer from '../ducks/images';

export const store = configureStore({
    reducer: {
        discs: discsReducer,
        images: imagesReducer,
    },
});
