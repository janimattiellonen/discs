import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

import discsReducer from '../ducks/discs'
import manufacturers from '../ducks/manufacturers'
import types from '../ducks/types'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    discs: discsReducer,
    //manufacturers,
    //types,
  },
});
