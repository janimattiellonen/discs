import DiscPage from '../DiscPage'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { saveDisc } from '../../ducks/discs'
import { fetchManufacturers } from '../../ducks/manufacturers'
import { fetchTypes } from '../../ducks/types'

export default connect(
  state => ({
    discs: state.discs.get('discs'),
    loadingDiscs: state.discs.get('loadingDiscs'),
    loadingDiscsFailed: state.discs.get('loadingDiscsFailed'),

    manufacturers: state.manufacturers.get('manufacturers'),
    loadingManufacturers: state.manufacturers.get('loadingManufacturers'),
    loadingManufacturersFailed: state.manufacturers.get('loadingManufacturersFailed'),

    types: state.types.get('types'),
    loadingTypes: state.types.get('loadingTypes'),
    loadingTypesFailed: state.types.get('loadingTypesFailed'),
  }),
  dispatch =>
    bindActionCreators(
      {
        fetchManufacturers,
        fetchTypes,
        saveDisc,
      },
      dispatch
    )
)(DiscPage)
