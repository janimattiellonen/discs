import DiscPage from '../DiscPage'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { saveDisc } from '../../ducks/discs'

export default connect(
  state => ({}),
  dispatch =>
    bindActionCreators(
      {
        saveDisc,
      },
      dispatch
    )
)(DiscPage)
