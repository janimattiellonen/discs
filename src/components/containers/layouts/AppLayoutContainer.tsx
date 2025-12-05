import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import AppLayout from './AppLayout';

import { fetchDiscsAsync, fetchDiscStatsAsync } from '../../../ducks/discs';
import { RootState } from '../../../app/store';

export default connect(
  (state: RootState) => ({
    discs: state.discs.discs,
    loadingDiscs: state.discs.loadingDiscs,
    loadingDiscsFailed: state.discs.loadingDiscsFailed,
    stats: state.discs.stats,
  }),
  (dispatch: Dispatch) => bindActionCreators(
    {
      fetchDiscs: fetchDiscsAsync,
      fetchDiscStats: fetchDiscStatsAsync,
    },
    dispatch,
  ),
)(AppLayout);
