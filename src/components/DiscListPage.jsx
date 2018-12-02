import React from 'react';

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
        <DiscTable discs={discs} />
      </div>
    );
  }
}

export default DiscListPage;