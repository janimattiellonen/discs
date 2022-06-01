import { List, Map } from 'immutable';
import typeApi from '../api/type';

const FETCH_TYPES = 'jme/discs/FETCH_TYPES';
const FETCH_TYPES_DONE = 'jme/discs/FETCH_TYPES_DONE';
const FETCH_TYPES_FAILED = 'jme/discs/FETCH_TYPES_FAILED';

const defaultState = Map({
    types: List(),
    loadingTypes: false,
    loadingTypesFailed: false,
});

export default function (state = defaultState, action = {}) {
    const { type, payload } = action;

    switch (type) {
        case FETCH_TYPES:
            return state.withMutations((map) => map.set('loadingTypes', false).set('loadingTypesFailed', false));

        case FETCH_TYPES_DONE:
            return state.withMutations((map) =>
                map.set('loadingTypes', false).set('loadingTypesFailed', false).set('types', List(payload)),
            );

        default:
            return state;
    }
}

export function fetchTypes() {
    return (dispatch) => {
        dispatch({ type: FETCH_TYPES });
        typeApi.getTypes().then(
            (types) => dispatch({ type: FETCH_TYPES_DONE, payload: types }),
            (error) => dispatch({ type: FETCH_TYPES_FAILED }),
        );
    };
}
