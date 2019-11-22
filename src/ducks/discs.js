import { List, Map } from 'immutable'
import discApi from '../api/disc'

const FETCH_DISCS = 'jme/discs/FETCH_DISCS'
const FETCH_DISCS_DONE = 'jme/discs/FETCH_DISCS_DONE'
const FETCH_DISCS_FAILED = 'jme/discs/FETCH_DISCS_FAILED'

const ADD_DISC = 'jme/discs/ADD_DISC'

const defaultState = Map({
  discs: List(),
  loadingDiscs: false,
  loadingDiscsFailed: false,
})

export default function(state = defaultState, action = {}) {
  const { type, payload } = action

  switch (type) {
    case FETCH_DISCS:
      return state.withMutations(map => map.set('loadingDiscs', false).set('loadingDiscsFailed', false))

    case FETCH_DISCS_DONE:
      return state.withMutations(map =>
        map
          .set('loadingDiscs', false)
          .set('loadingDiscsFailed', false)
          .set('discs', List(payload))
      )

    case ADD_DISC:
      return state

    default:
      return state
  }
}

export function fetchDiscs() {
  return dispatch => {
    dispatch({ type: FETCH_DISCS })
    discApi.getDiscs().then(
      discs => dispatch({ type: FETCH_DISCS_DONE, payload: discs }),
      error => dispatch({ type: FETCH_DISCS_FAILED })
    )
  }
}

export function saveDisc(data) {
  return dispatch => {
    discApi.addDisc(data).then(data => dispatch({ ype: ADD_DISC, payload: data }))
  }
}
