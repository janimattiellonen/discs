import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import queryString from 'query-string'
import { Helmet } from 'react-helmet'

import Button from '@material-ui/core/Button'

import DiscGallery from './DiscGallery'

const FilterContainer = styled.div({
  margin: '15px',
})

const MorePanel = styled('div')({ width: '50%', margin: '0 auto', clear: 'both', textAlign: 'center' })

const DiscsPanel = styled('div')({
  padding: '0 20px 20px 20px',
})

const DiscGalleryPage = ({ discs, history, fetchDiscs, loadingDiscs, location }) => {
  //const [discLimit, setDiscLimit] = useState(limit)
  //const [discOffset, setDiscOffset] = useState(offset)
  const queryParams = queryString.parse(location.search)

  const limit = queryParams.limit || 2
  const offset = queryParams.offset || 0
  const type = queryParams.type || null
  const missing = queryParams.missing || null
  const sold = queryParams.sold || null
  const donated = queryParams.donated || null
  const collection = queryParams.collection || null
  const ownStamp = queryParams.ownStamp || null

  const loadMore = () => {
    console.log(JSON.stringify(queryParams, null, 2))
    console.log(`type: ${type}`)
    //fetchDiscs({ query: { type }, limit, offset: offset + limit, order: { column: '_created', mode: 'ASC' } })
    //setDiscOffset(discOffset + discLimit)

    history.replace(
      `${location.pathname}?${queryString.stringify({
        type,
        limit,
        missing,
        sold,
        donated,
        collection,
        ownStamp,
        offset: parseInt(offset, 10) + parseInt(limit, 10),
      })}`
    )
  }

  useEffect(() => {
    //history.replace(`${location.pathname}?${url}`)
    fetchDiscs({ query: { type, missing, sold, donated, collection, ownStamp }, limit, offset: offset })
  }, [limit, offset, type, missing, sold, donated, collection, ownStamp])
  /*
  const search = term => {
    const queryParams = queryString.parse(location.search)

    queryParams.term = term

    history.replace(`${location.pathname}?${queryString.stringify(queryParams)}`)
  }
  */
  return (
    <div>
      <Helmet title="My discs - Gallery" />

      <MorePanel>
        <div>
          <Button size="large" variant="contained" color="primary" onClick={() => loadMore()} disabled={loadingDiscs}>
            {loadingDiscs ? 'Loading...' : 'More...'}
          </Button>
        </div>
      </MorePanel>

      <FilterContainer className="filter-container"></FilterContainer>
      <DiscsPanel className="disc-gallery-page discs">
        <DiscGallery discs={discs} />
      </DiscsPanel>
      {discs.count() > 0 && (
        <MorePanel>
          <div>
            <Button size="large" variant="contained" color="primary" onClick={() => loadMore()} disabled={loadingDiscs}>
              {loadingDiscs ? 'Loading...' : 'More...'}
            </Button>
          </div>
        </MorePanel>
      )}
    </div>
  )
}

export default DiscGalleryPage
