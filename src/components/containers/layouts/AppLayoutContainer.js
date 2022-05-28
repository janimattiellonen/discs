import AppLayout from './AppLayout'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchDiscs, fetchDiscStats, fetchDiscsAsync, fetchDiscStatsAsync } from '../../../ducks/discs'
import { fetchManufacturers } from '../../../ducks/manufacturers'
import { fetchTypes } from '../../../ducks/types'

export default connect(
  state => ({
    discs: state.discs.discs,
    loadingDiscs: state.discs.loadingDiscs,
    loadingDiscsFailed: state.discs.loadingDiscsFailed,
    stats: state.discs.stats,

    /*
    manufacturers: state.manufacturers.get('manufacturers'),
    loadingManufacturers: state.manufacturers.get('loadingManufacturers'),
    loadingManufacturersFailed: state.manufacturers.get('loadingManufacturersFailed'),

    types: state.types.get('types'),
    loadingTypes: state.types.get('loadingTypes'),
    loadingTypesFailed: state.types.get('loadingTypesFailed'),
    */
  }),
  dispatch =>
    bindActionCreators(
      {
        fetchDiscs: fetchDiscsAsync,
        fetchDiscStats: fetchDiscStatsAsync,
        fetchManufacturers,
        fetchTypes,
      },
      dispatch
    )
)(AppLayout)
