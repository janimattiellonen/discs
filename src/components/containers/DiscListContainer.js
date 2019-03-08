import DiscListPage from '../DiscListPage'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchDiscs } from '../../ducks/discs'

export default connect(
  state => ({
    discs: state.discs.get('discs'),
  }),
  dispatch =>
    bindActionCreators(
      {
        fetchDiscs,
      },
      dispatch
    )
)(DiscListPage)
