import LoginPage from '../LoginPage'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { login } from '../../ducks/user'

export default connect(
  state => ({
    user: state.user.get('user'),
  }),
  dispatch => bindActionCreators({ login }, dispatch)
)(LoginPage)
