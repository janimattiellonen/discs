import React from 'react'

import { Col, Row } from 'react-bootstrap'
import GalleryItem from "./GalleryItem";

const DiscGallery = ({discs}) => (
  <Row>
    {discs.map(disc => (
      <Col key={`col-${disc.id}`} xs={12} sm={6} lg={4}>
        <GalleryItem disc={disc} />
      </Col>
    ))}
  </Row>
)

export default DiscGallery
