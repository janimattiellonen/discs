import DiscGalleryPage from '../DiscGalleryPage'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchDiscs } from '../../ducks/discs'

export default connect(
  state => ({
    discs: state.discs.get('discs'),
    loadingDiscs: state.discs.get('loadingDiscs'),
    limit: state.discs.get('limit'),
    offset: state.discs.get('offset'),
    total: state.discs.get('total'),
    count: state.discs.get('count'),
    skip: state.discs.get('skip'),
  }),
  dispatch =>
    bindActionCreators(
      {
        fetchDiscs,
      },
      dispatch
    )
)(DiscGalleryPage)
