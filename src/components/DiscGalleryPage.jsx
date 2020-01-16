import React, { useContext, useEffect, useState } from 'react'

import { List } from 'immutable'
import queryString from 'query-string'
import { Helmet } from 'react-helmet'

import clone from 'lodash.clonedeep'
import moment from 'moment'

import filterDiscs from '../util/filter'
import DiscGallery from './DiscGallery'
import Fuse from 'fuse.js'
import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'

import cookies from 'react-cookies'

import { Auth0Context } from '../contexts/Auth0Context'

const FilterContainer = styled.div`
  margin: 15px;
`

const DiscGalleryPage = ({ discs, history, loadingDiscs, location }) => {
  const [filteredDiscs, setFilteredDiscs] = useState(discs)
  const [isLoaded, setIsLoaded] = useState(false)
  const queryParams = queryString.parse(location.search)
  const type = queryParams.type
  const auth0 = useContext(Auth0Context)

  const token = cookies.load('Authorization')

  console.log('token now: ' + token)

  useEffect(() => {
    if (discs.size > 0 || 1 === 1) {
      setFilteredDiscs(filterDiscs(discs, { type: queryParams.type }))
    } else if (discs.size === 0) {
      setFilteredDiscs(List([]))
    }
  }, [type, discs.size])

  const search = term => {
    const queryParams = queryString.parse(location.search)

    queryParams.term = term

    history.replace(`${location.pathname}?${queryString.stringify(queryParams)}`)

    if (term === '') {
      setFilteredDiscs(filterDiscs(discs, { type: queryParams.type }))

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

    setFilteredDiscs(filterDiscs(List(fuse.search(term))))
  }

  const onHistoryChange = () => {}

  const sortByCreationDate = discs => {
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

  const sortByName = discs => {
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

  const getDiscs = () => {
    if (!isLoaded) {
      setIsLoaded(true)
      return discs
    }

    return filteredDiscs
  }

  if (loadingDiscs) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Helmet title="My discs - Gallery" />

      <p>{auth0.message}</p>

      <p>
        <button onClick={auth0.loginWithRedirect} className="button is-danger">
          Login
        </button>
      </p>

      <FilterContainer className="filter-container">
        <Row>
          <Col>
            <input className="form-control" type="text" onChange={e => search(e.target.value)} />
          </Col>
        </Row>
      </FilterContainer>
      <div className="disc-gallery-page discs">
        <DiscGallery discs={getDiscs()} />
      </div>
    </div>
  )
}

export default DiscGalleryPage
