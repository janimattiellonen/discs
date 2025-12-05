import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { fetchDiscDataAsync } from '../../ducks/discs';

import { DiscGalleryPage } from '../DiscGalleryPage';
import { RootState } from '../../app/store';

export default connect(
    (state: RootState) => ({
        limit: state.discs.limit,
        offset: state.discs.offset,
        total: state.discs.total,
        count: state.discs.count,
        skip: state.discs.skip,

        discs: state.discs.discs,
        loadingDiscs: state.discs.loadingDiscs,
        loadingDiscsFailed: state.discs.loadingDiscsFailed,
        stats: state.discs.stats,
        data: state.discs.data,
    }),
    (dispatch: Dispatch) =>
        bindActionCreators(
            {
                fetchDiscData: fetchDiscDataAsync,
            },
            dispatch,
        ),
)(DiscGalleryPage);
