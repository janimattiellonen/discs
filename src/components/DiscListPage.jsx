import React from 'react';
import { Helmet } from 'react-helmet';

import DiscTable from './DiscTable';

class DiscListPage extends React.Component {
  constructor(props) {
    super(props);

    props.fetchDiscs();
  }
  render() {
    const { discs } = this.props;

    return (
      <div>
        <Helmet title="My discs - List" />
        <DiscTable discs={discs} />
      </div>
    );
  }
}

export default DiscListPage;