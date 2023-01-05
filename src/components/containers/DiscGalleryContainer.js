import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchDiscDataAsync } from '../../ducks/discs';

import { DiscGalleryPage } from '../DiscGalleryPage';

export default connect(
    (state) => ({
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
    (dispatch) =>
        bindActionCreators(
            {
                fetchDiscData: fetchDiscDataAsync,
            },
            dispatch,
        ),
)(DiscGalleryPage);
