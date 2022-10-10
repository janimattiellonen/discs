import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import discs from './discs';
import manufacturers from './manufacturers';
import types from './types';

export default (history) =>
    combineReducers({
        router: connectRouter(history),
        discs,
        manufacturers,
        types,
    });
