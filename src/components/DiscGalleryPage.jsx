import React from 'react';
import { Col, Row } from 'react-bootstrap';

import GalleryItem from './GalleryItem';
import Filter from './Filter';

class DiscGalleryPage extends React.Component {
  constructor(props) {
    super(props);

    props.fetchDiscs();
  }

  render() {
    const { discs } = this.props;

    return (
      <div>
        <div className="filter-container">
          <Filter discs={discs}/>
        </div>
        <div className="disc-gallery-page discs">
          <Row>
            {discs.map (disc => (
              <Col key={`col-${disc._id}`} xs={12} sm={6} lg={4}>
                <GalleryItem disc={disc} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    );
  }
}

export default DiscGalleryPage;