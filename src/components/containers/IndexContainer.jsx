import Index from '../Index';

import { connect } from 'react-redux';
function foo() {}

export default connect(
    (state) => ({
        discs: state.discs.get('discs'),
    }),
    {
        foo,
    },
)(Index);
