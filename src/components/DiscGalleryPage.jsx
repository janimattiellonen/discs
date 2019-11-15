import React from 'react'

import { List } from 'immutable'
import queryString from 'query-string'
import { Helmet } from 'react-helmet'

import clone from 'lodash.clonedeep'
import moment from 'moment'

import filterDiscs from '../util/filter'
import DiscGallery from "./DiscGallery";
import Fuse from "fuse.js";
import { debounce } from "throttle-debounce";
import {Col, Row} from "react-bootstrap";

class DiscGalleryPage extends React.Component {
  constructor(props) {
    super(props)

    this.search = debounce(500, this.search)

    this.state = {
      unlistenHistory: f => f,
      discs: props.discs,
      filteredDiscs: List(),
    }
  }

  search(term) {
    const { discs } = this.props

    const queryParams = queryString.parse(this.props.location.search)

    queryParams.term = term

    this.props.history.replace(`${this.props.location.pathname}?${queryString.stringify(queryParams)}`)

    if (term === '') {

      this.setState({
        filteredDiscs: filterDiscs(discs, { type: queryParams.type }),
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
      filteredDiscs: filterDiscs(List(fuse.search(term), { type: queryParams.type })),
    })
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

  componentDidUpdate(prevProps) {
    if (
      !this.state.filteredDiscs ||
      !this.state.filteredDiscs.count() ||
      prevProps.location.search !== this.props.location.search
    ) {
      const queryParams = queryString.parse(this.props.location.search)

      this.setState({
        discs: this.props.discs,
        filteredDiscs: filterDiscs(this.props.discs, queryParams),
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

  render() {
    const { discs, filteredDiscs } = this.state

    return (
      <div>
        <Helmet title="My discs - Gallery" />

        <div className="filter-container">
          <Row>
            <Col>
              <input className="form-control" type="text" onChange={(e) => this.search(e.target.value)} />
            </Col>
          </Row>
        </div>
        <div className="disc-gallery-page discs">
          <DiscGallery discs={filteredDiscs}/>
        </div>
      </div>
    )
  }
}

export default DiscGalleryPage
