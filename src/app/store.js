import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

import discsReducer from '../ducks/discs';
import imagesReducer from '../ducks/images';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        discs: discsReducer,
        images: imagesReducer,
    },
});
