import React from 'react'
import styled from 'styled-components'

import { Col, Row } from 'react-bootstrap'
import { List } from 'immutable'
import queryString from 'query-string'
import { Helmet } from 'react-helmet'
import Fuse from 'fuse.js'
import { debounce } from 'throttle-debounce'
import clone from 'lodash.clonedeep'
import moment from 'moment'

import GalleryItem from './GalleryItem'
import Filter from './Filter'

class DiscGalleryPage extends React.Component {
  constructor(props) {
    super(props)

    console.log("DiscGalleryPage")
    props.fetchDiscs()

    this.search = debounce(500, this.search)

    this.state = {
      unlistenHistory: f => f,
      discs: props.discs,
      filteredDiscs: List(),
    }
  }

  componentWillMount() {
    const { history } = this.props
    const unlistenHistory = history.listen(this.onHistoryChange)

    this.setState({ unlistenHistory })
  }

  componentDidMount() {
    this.onHistoryChange()
  }

  componentWillUnmount() {
    const { unlistenHistory } = this.state

    unlistenHistory()
  }

  filterDiscs(discs, filter) {
    discs = discs.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1
      }

      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1
      }

      return 0
    })

    if (!filter) {
      return discs
    }

    if (filter.type === 'distanceDriver') {
      return discs.filter(disc => disc.type === 'Distance driver')
    }

    if (filter.type === 'fairwayDriver') {
      return discs.filter(disc => disc.type === 'Fairway driver')
    }

    if (filter.type === 'putter') {
      return discs.filter(disc => disc.type === 'Putter')
    }

    if (filter.type === 'midrange') {
      return discs.filter(disc => disc.type === 'Mid-range')
    }

    if (filter.type === 'approach') {
      return discs.filter(disc => disc.type === 'Approach')
    }

    if (filter.type === 'missing') {
      return discs.filter(disc => disc.is_missing === true)
    }

    if (filter.type === 'sold') {
      return discs.filter(disc => disc.is_sold === true)
    }

    if (filter.type === 'donated') {
      return discs.filter(disc => disc.is_donated === true)
    }

    if (filter.type === 'broken') {
      return discs.filter(disc => disc.is_broken === true)
    }

    if (filter.type === 'collection') {
      return discs.filter(disc => disc.is_collection_item === true)
    }

    if (filter.type === 'ownStamp') {
      return discs.filter(disc => disc.is_own_stamp === true)
    }

    if (filter.type === 'available') {
      return discs.filter(disc => disc.is_sold !== true && disc.is_missing !== true && disc.is_broken !== true)
    }

    if (filter.type === 'holeInOne') {
      return discs.filter(disc => disc.is_hole_in_one === true)
    }

    if (filter.type === 'latest') {
      return discs
        .sort((a, b) => {
          if (moment(a.created_at).isBefore(moment(b.created_at))) {
            return -1
          }

          if (moment(a.created_at).isAfter(moment(b.created_at))) {
            return 1
          }

          if (moment(a.created_at).isSame(moment(b.created_at))) {
            return 0
          }

          return 1
        })
        .takeLast(10)
        .reverse()
    }

    return discs
  }

  componentDidUpdate(prevProps) {
    if (
      !this.state.filteredDiscs ||
      !this.state.filteredDiscs.count() ||
      prevProps.location.search !== this.props.location.search
    ) {
      const queryParams = queryString.parse(this.props.location.search)

      this.setState({
        discs: this.props.discs,
        filteredDiscs: this.filterDiscs(this.props.discs, queryParams),
      })
    }
  }

  onHistoryChange = () => {}

  sortByCreationDate = discs => {
    let sortedDiscs = clone(discs)

    sortedDiscs = sortedDiscs.sort((a, b) => {
      if (moment(a.created_at).isAfter(moment(b.created_at))) {
        return 1
      }

      if (moment(a.created_at).isBefore(moment(b.created_at))) {
        return -1
      }

      if (moment(a.created_at).isSame(moment(b.created_at), 'day')) {
        return 0
      }

      return -1
    })

    return sortedDiscs
  }

  sortByName = discs => {
    let sortedDiscs = clone(discs)

    sortedDiscs = sortedDiscs.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1
      }

      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1
      }

      return 0
    })

    return sortedDiscs
  }

  search = term => {
    const { discs } = this.props

    const queryParams = queryString.parse(this.props.location.search)

    queryParams.term = term

    this.props.history.replace(`${this.props.location.pathname}?${queryString.stringify(queryParams)}`)

    if (term === '') {
      this.setState({
        filteredDiscs: this.filterDiscs(discs, { type: queryParams.type }),
      })

      return
    }

    const options = {
      shouldSort: true,
      threshold: 0.2,
      location: 0,
      distance: 30,
      minMatchCharLength: 1,
      keys: ['name'],
    }

    const fuse = new Fuse(discs.toArray(), options)

    this.setState({
      filteredDiscs: this.filterDiscs(List(fuse.search(term), { type: queryParams.type })),
    })
  }

  render() {
    const { discs, filteredDiscs } = this.state

    const Title = styled.h1`
      font-size: 1.5em;
      text-align: center;
      color: palevioletred;
    `;

    return (
      <div>
        <Helmet title="My discs - Gallery" />

        <Title>
          Hello World! Testing, whether styled components work or not
        </Title>
        <div className="filter-container">
          <Filter discs={discs} onSearch={this.search} />
        </div>
        <div className="disc-gallery-page discs">
          <Row>
            {filteredDiscs.map(disc => (
              <Col key={`col-${disc.id}`} xs={12} sm={6} lg={4}>
                <GalleryItem disc={disc} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    )
  }
}

export default DiscGalleryPage
