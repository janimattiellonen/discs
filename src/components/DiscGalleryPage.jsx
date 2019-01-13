import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { List } from 'immutable';
import queryString from 'query-string';

import GalleryItem from './GalleryItem';
import Filter from './Filter';

class DiscGalleryPage extends React.Component {
  constructor(props) {
    super(props);

    props.fetchDiscs();

    this.state = {
      unlistenHistory: f => f,
      discs: props.discs,
      filteredDiscs: List(),
    };
  }

  componentWillMount() {
    const { history } = this.props;
    const unlistenHistory = history.listen(this.onHistoryChange);

    this.setState({ unlistenHistory });
  }

  componentDidMount() {
    this.onHistoryChange();
  }

  componentWillUnmount() {
    const { unlistenHistory } = this.state;

    unlistenHistory();
  }

  filterDiscs(discs, filter) {
    if (!filter) {
      return discs;
    }

    if (filter.type === 'distanceDriver') {
      return discs.filter(disc => disc.type === 'Distance driver');
    }

    if (filter.type === 'fairwayDriver') {
      return discs.filter(disc => disc.type === 'Fairway driver');
    }

    if (filter.type === 'putter') {
      return discs.filter(disc => disc.type === 'Putter');
    }

    if (filter.type === 'midrange') {
      return discs.filter(disc => disc.type === 'Mid-range');
    }

    if (filter.type === 'approach') {
      return discs.filter(disc => disc.type === 'Approach');
    }

    if (filter.type === 'missing') {
      return discs.filter(disc => disc.missing === true);
    }

    if (filter.type === 'sold') {
      return discs.filter(disc => disc.sold === true);
    }

    if (filter.type === 'isBroken') {
      return discs.filter(disc => disc.is_broken === true);
    }

    if (filter.type === 'isCollectible') {
      return discs.filter(disc => disc.collection_item === true);
    }

    if (filter.type === 'isAvailable') {
      return discs.filter(disc => disc.sold !== true && disc.missing !== true && disc.broken !== true);
    }



    return discs;
  }

  componentDidUpdate(prevProps) {
    const queryParams = queryString.parse(this.props.location.search);

    if (prevProps.location.search !== this.props.location.search) {
      const queryParams = queryString.parse(this.props.location.search);

      this.setState({
        filteredDiscs: this.filterDiscs(this.props.discs, queryParams),
      });
    }

    if (this.props.discs !== prevProps.discs) {
      this.setState({
        discs: this.props.discs,
        filteredDiscs: this.props.discs,
      });
    }
  }

  onHistoryChange = () => {
    const queryParams = queryString.parse(this.props.location.search);
  }

  render() {
    const { discs, filteredDiscs } = this.state;

    return (
      <div>
        <div className="filter-container">
          <Filter discs={discs} />
        </div>
        <div className="disc-gallery-page discs">
          <Row>
            {filteredDiscs.map (disc => (
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