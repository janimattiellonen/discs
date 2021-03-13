import { List, Map } from 'immutable'
import discApi from '../api/disc'

const FETCH_DISCS = 'jme/discs/FETCH_DISCS'
const FETCH_DISCS_DONE = 'jme/discs/FETCH_DISCS_DONE'
const FETCH_DISCS_FAILED = 'jme/discs/FETCH_DISCS_FAILED'

const FETCH_DISC_STATS = 'jme/discs/FETCH_DISC_STATS'
const FETCH_DISC_STATS_DONE = 'jme/discs/FETCH_DISC_STATS_DONE'
const FETCH_DISC_STATS_FAILED = 'jme/discs/FETCH_DISC_STATS_FAILED'

const ADD_DISC = 'jme/discs/ADD_DISC'

const defaultState = Map({
  discs: List(),
  stats: Map(),
  loadingDiscs: false,
  loadingDiscsFailed: false,
  loadingStats: false,
  loadingStatsFailed: false,
  limit: 25,
  offset: 0,
})

export default function(state = defaultState, action = {}) {
  const { type, payload } = action

  switch (type) {
    case FETCH_DISCS:
      return state.withMutations(map => map.set('loadingDiscs', true).set('loadingDiscsFailed', false))

    case FETCH_DISCS_DONE:
      const limit = parseInt(payload.limit, 10)
      const offset = parseInt(payload.offset, 10)

      return state.withMutations(map =>
        map
          .set('loadingDiscs', false)
          .set('loadingDiscsFailed', false)
          .set('discs', offset === 0 ? List(payload.discs) : map.get('discs').concat(List(payload.discs)))
          .set('limit', limit)
          .set('offset', offset)
      )

    case FETCH_DISC_STATS:
      return state.withMutations(map => map.set('loadingStats', false).set('loadingStatsFailed', false))

    case FETCH_DISC_STATS_DONE:
      return state.withMutations(map =>
        map
          .set('loadingStats', false)
          .set('loadingStatsFailed', false)
          .set('stats', Map(payload))
      )

    case ADD_DISC:
      return state

    default:
      return state
  }
}

export function fetchDiscs(params) {
  return dispatch => {
    dispatch({ type: FETCH_DISCS })

    Promise.all([discApi.getDiscs(params)]).then(results => {
      console.log(JSON.stringify(results, null, 2))
      console.log(`data: ${JSON.stringify(results[0], null, 2)}`)
      console.log(`discs: ${JSON.stringify(results[1], null, 2)}`)

      return dispatch({
        type: FETCH_DISCS_DONE,
        payload: { discs: results[1], limit: params.limit, offset: params.offset },
      })
    })
  }
}

export function fetchDiscStats() {
  return dispatch => {
    dispatch({ type: FETCH_DISC_STATS })
    discApi.getStats().then(
      stats => dispatch({ type: FETCH_DISC_STATS_DONE, payload: stats }),
      () => dispatch({ type: FETCH_DISC_STATS_FAILED })
    )
  }
}

export function saveDisc(data, token) {
  return dispatch => {
    //discApi.addDisc(data, token).then(data => dispatch({ type: ADD_DISC, payload: data }))
  }
}
