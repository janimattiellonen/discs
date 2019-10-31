import DiscPage from '../DiscPage'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export default connect(
  state => ({}),
  dispatch =>
    bindActionCreators(
      {
        //fetchDiscs,
      },
      dispatch
    )
)(DiscPage)
