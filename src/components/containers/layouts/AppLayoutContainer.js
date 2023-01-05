import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppLayout from './AppLayout';

import { fetchDiscsAsync, fetchDiscStatsAsync } from '../../../ducks/discs';

export default connect(
  (state) => ({
    discs: state.discs.discs,
    loadingDiscs: state.discs.loadingDiscs,
    loadingDiscsFailed: state.discs.loadingDiscsFailed,
    stats: state.discs.stats,
  }),
  (dispatch) => bindActionCreators(
    {
      fetchDiscs: fetchDiscsAsync,
      fetchDiscStats: fetchDiscStatsAsync,
    },
    dispatch,
  ),
)(AppLayout);
