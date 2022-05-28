import { List, Map } from 'immutable'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


import discApi from '../api/disc'
import {counterSlice, incrementAsync} from "../features/counter/counterSlice";

const FETCH_DISCS = 'jme/discs/FETCH_DISCS'
const FETCH_DISCS_DONE = 'jme/discs/FETCH_DISCS_DONE'
const FETCH_DISCS_FAILED = 'jme/discs/FETCH_DISCS_FAILED'

const FETCH_DISC_STATS = 'jme/discs/FETCH_DISC_STATS'
const FETCH_DISC_STATS_DONE = 'jme/discs/FETCH_DISC_STATS_DONE'
const FETCH_DISC_STATS_FAILED = 'jme/discs/FETCH_DISC_STATS_FAILED'

const ADD_DISC = 'jme/discs/ADD_DISC'

const initialState = {
  discs: [],
  stats: {},
  loadingDiscs: false,
  loadingDiscsFailed: false,
  loadingStats: false,
  loadingStatsFailed: false,
  limit: 25,
  offset: 0,
  total: 0,
  count: 0,
  skip: 0,
}

export const fetchDiscStatsAsync = createAsyncThunk('discs/fetchDiscStats', async () => {
  console.log('fetchDiscStats');

  const response = await discApi.getStats();
  console.log(`PP: ${JSON.stringify(response,null,2)}`);
  return response;

  /*
    dispatch({ type: FETCH_DISC_STATS })
    discApi.getStats().then(
      stats => dispatch({ type: FETCH_DISC_STATS_DONE, payload: stats }),
      () => dispatch({ type: FETCH_DISC_STATS_FAILED })
    )
   */
});

export const fetchDiscsAsync = createAsyncThunk('discs/fetchDiscs', async (params) => {
  const response = await discApi.getDiscs(params)

  const payload = {
    discs: response.data,
    total: response.totals.total,
    limit: params.limit,
    offset: params.offset,
    count: response.totals.count,
    skip: response.totals.skip,
  }

  return payload;
})

export const discsSlice = createSlice({
  name: 'discs',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDiscsAsync.fulfilled, (state, action) => {
        state.discs = action.payload.discs;
        state.skip = action.payload.skip;
        state.offset = action.payload.offset;
        state.count = action.payload.count;
        state.total = action.payload.total;
      })
      .addCase(fetchDiscStatsAsync.pending, (state) => {

      })
      .addCase(fetchDiscStatsAsync.fulfilled, (state, action) => {
        console.log(`fetchDiscStatsAsync.fulfilled, payload: ${JSON.stringify(action.payload,null,2)}`);
        state.stats = action.payload;
      })
  }
})

// TODO: Remove
const foo = (state = initialState, action = {}) => {
  const { type, payload } = action

  switch (type) {
    case FETCH_DISCS:
      return state.withMutations(map => map.set('loadingDiscs', true).set('loadingDiscsFailed', false))

    case FETCH_DISCS_DONE:
      const limit = parseInt(payload.limit, 10)
      const offset = parseInt(payload.offset, 10)
      const total = parseInt(payload.total, 10)
      const count = parseInt(payload.count, 10)
      const skip = parseInt(payload.skip, 10)

      return state.withMutations(map =>
        map
          .set('loadingDiscs', false)
          .set('loadingDiscsFailed', false)
          .set('discs', offset === 0 ? List(payload.discs) : map.get('discs').concat(List(payload.discs)))
          .set('limit', limit)
          .set('offset', offset)
          .set('count', count)
          .set('total', total)
          .set('skip', skip)
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

    discApi.getDiscs(params).then(results => {
      return dispatch({
        type: FETCH_DISCS_DONE,
        payload: {
          discs: results.data,
          total: results.totals.total,
          limit: params.limit,
          offset: params.offset,
          count: results.totals.count,
          skip: results.totals.skip,
        },
      })
    })
    /*
    discApi.getFoo().then(data => {
      console.log(`data: ${JSON.stringify(data, null, 2)}`)
    })
  */
    /*
    discApi.getDiscs(params).then(
      discs => {
        dispatch({ type: FETCH_DISCS_DONE, payload: { discs, limit: params.limit, offset: params.offset } })
      },
      () => dispatch({ type: FETCH_DISCS_FAILED })
    )
    */
  }
}

export function fetchDiscStats() {
  console.log('fetchDiscStats');
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

export default discsSlice.reducer;
