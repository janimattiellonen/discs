import React from 'react';
import { Col, Row } from 'react-bootstrap';

class DiscGalleryPage extends React.Component {
  render() {
    const { discs } = this.props;

    return (
      <div className="disc-gallery-page">
        <Row>
          {discs.map (disc => (
            <Col key={disc.id} md={3}>
              <img src={disc.image} />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default DiscGalleryPage;