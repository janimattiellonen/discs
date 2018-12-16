import React from 'react';
import { Col, Row } from 'react-bootstrap';

import GalleryItem from './GalleryItem';

class DiscGalleryPage extends React.Component {
  constructor(props) {
    super(props);

    props.fetchDiscs();
  }

  render() {
    const { discs } = this.props;

    return (
      <div className="disc-gallery-page discs">
        <Row>
          {discs.map (disc => (
            <Col key={disc.id} xs={12} sm={6} lg={4}>
              <GalleryItem disc={disc} />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default DiscGalleryPage;