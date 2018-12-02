import { List, Map } from "immutable";
import discService from '../services/disc-service'

const FETCH_DISCS = 'jme/discs/FETCH_DISCS';

const defaultState = Map({
  discs: List(),
});

export default function (state = defaultState, action = {}) {
  const { type, payload } = action;

  switch(type) {
    case FETCH_DISCS: {
      return state
        .set('discs', List(payload));
    }

    default:
      return state;
  }
};

export function fetchDiscs() {
  return (dispatch) => {
    discService.getDiscs()
      .then(discs => dispatch({type: FETCH_DISCS, payload: discs}));
  }
}