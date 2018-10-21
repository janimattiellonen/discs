import DiscGalleryPage from '../DiscGalleryPage';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

function foo() {};

export default connect(
  state => ({
    discs: state.discs.get('discs'),
  }),
  dispatch => bindActionCreators({
    foo,
  }, dispatch),
)(DiscGalleryPage);
