import AppLayout from './AppLayout'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchDiscs } from '../../../ducks/discs'

export default connect(
  state => ({
    discs: state.discs.get('discs'),
    loadingDiscs: state.discs.get('loadingDiscs'),
    loadingDiscsFailed: state.discs.get('loadingDiscsFailed'),
  }),
  dispatch =>
    bindActionCreators(
      {
        fetchDiscs,
      },
      dispatch
    )
)(AppLayout)
