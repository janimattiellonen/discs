import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { uploadImageAsync } from '../../ducks/images';

import { ImageUpload } from '../ImageUpload';

export default connect(
    (state) => ({}),
    (dispatch) =>
        bindActionCreators(
            {
                uploadImage: uploadImageAsync,
            },
            dispatch,
        ),
)(ImageUpload);
