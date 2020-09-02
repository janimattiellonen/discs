import React, { useContext, useEffect, useState } from 'react'

import queryString from 'query-string'
import { Helmet } from 'react-helmet'

import Button from '@material-ui/core/Button'

import DiscGallery from './DiscGallery'
import styled from '@emotion/styled'

const FilterContainer = styled.div({
  margin: '15px',
})

const MorePanel = styled('div')({ width: '50%', margin: '0 auto', clear: 'both', textAlign: 'center' })

const DiscGalleryPage = ({ discs, history, fetchDiscs, loadingDiscs, location, limit, offset }) => {
  const [discLimit, setDiscLimit] = useState(limit)
  const [discOffset, setDiscOffset] = useState(offset)
  const [url, setUrl] = useState('foo')
  const queryParams = queryString.parse(location.search)
  const type = queryParams.type

  const loadMore = () => {
    //fetchDiscs({ limit, offset: offset + limit, order: { column: '_created', mode: 'ASC' } })
    setDiscOffset(discOffset + discLimit)
  }

  useEffect(() => {
    console.log(`url: ${url}`)
    //history.replace(`${location.pathname}?${url}`)
    fetchDiscs({ limit: discLimit, offset: discOffset })
  }, [discLimit, discOffset])
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
      <div className="disc-gallery-page discs">
        <DiscGallery discs={discs} />
      </div>
      <MorePanel>
        <div>
          <Button size="large" variant="contained" color="primary" onClick={() => loadMore()} disabled={loadingDiscs}>
            {loadingDiscs ? 'Loading...' : 'More...'}
          </Button>
        </div>
      </MorePanel>
    </div>
  )
}

export default DiscGalleryPage
