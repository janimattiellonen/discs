import { List, Map } from 'immutable';
import manufacturerApi from '../api/manufacturer';

const FETCH_MANUFACTURERS = 'jme/discs/FETCH_MANUFACTURERS';
const FETCH_MANUFACTURERS_DONE = 'jme/discs/FETCH_MANUFACTURERS_DONE';
const FETCH_MANUFACTURERS_FAILED = 'jme/discs/FETCH_MANUFACTURERS_FAILED';

const defaultState = Map({
    manufacturers: List(),
    loadingManufacturers: false,
    loadingManufacturersFailed: false,
});

export default function (state = defaultState, action = {}) {
    const { type, payload } = action;

    switch (type) {
        case FETCH_MANUFACTURERS:
            return state.withMutations((map) =>
                map.set('loadingManufacturers', false).set('loadingManufacturersFailed', false),
            );

        case FETCH_MANUFACTURERS_DONE:
            return state.withMutations((map) =>
                map
                    .set('loadingManufacturers', false)
                    .set('loadingManufacturersFailed', false)
                    .set('manufacturers', List(payload)),
            );

        default:
            return state;
    }
}

export function fetchManufacturers() {
    return (dispatch) => {
        dispatch({ type: FETCH_MANUFACTURERS });
        manufacturerApi.getManufacturers().then(
            (manufacturers) => dispatch({ type: FETCH_MANUFACTURERS_DONE, payload: manufacturers }),
            (error) => dispatch({ type: FETCH_MANUFACTURERS_FAILED }),
        );
    };
}
