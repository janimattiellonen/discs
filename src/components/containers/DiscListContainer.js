import DiscListPage from '../DiscListPage';

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
)(DiscListPage);
