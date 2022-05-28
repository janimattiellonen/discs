import DiscGalleryPage from '../DiscGalleryPage'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchDiscs, fetchDiscsAsync } from '../../ducks/discs'

export default connect(
  state => ({
    limit: state.discs.limit,
    offset: state.discs.offset,
    total: state.discs.total,
    count: state.discs.count,
    skip: state.discs.skip,


    discs: state.discs.discs,
    loadingDiscs: state.discs.loadingDiscs,
    loadingDiscsFailed: state.discs.loadingDiscsFailed,
    stats: state.discs.stats,
  }),
  dispatch =>
    bindActionCreators(
      {
        fetchDiscs: fetchDiscsAsync,
      },
      dispatch
    )
)(DiscGalleryPage)
