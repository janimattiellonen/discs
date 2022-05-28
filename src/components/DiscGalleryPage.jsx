import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useSelector } from 'react-redux'

import styled from '@emotion/styled'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import debounce from 'lodash.debounce'

import queryString from 'query-string'

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import DiscGallery from './DiscGallery'

import { theme } from '../util/theme'

const SearchField = styled(TextField)({
  margin: '20px',
  width: 'calc(100% - 40px)',
  '&.MuiTextField-root': {
    '.MuiInputBase-input': {
      fontSize: '2em',
    },
  },
})

const MorePanel = styled('div')({
  width: '50%',
  margin: '0 auto',
  paddingTop: '40px',
  marginBottom: '80px',
  clear: 'both',
  textAlign: 'center',
})

const MoreButton = styled(Button)({
  '&.MuiButtonBase-root': {
    padding: '15px 30px',
    fontSize: '1em',
    [theme.mq('1000')]: {
      padding: '8px 22px',
      fontSize: '0.9375rem',
    },
  },
})

const DiscsPanel = styled('div')({
  padding: '0 20px 20px 20px',
})

const CenterP = styled.p({
  display: 'flex',
  justifyContent: 'center',
})

/*
    limit: state.discs.limit,
    offset: state.discs.offset,
    total: state.discs.total,
    count: state.discs.count,
    skip: state.discs.skip,


    discs: state.discs.discs,
    loadingDiscs: state.discs.loadingDiscs,
    loadingDiscsFailed: state.discs.loadingDiscsFailed,
    stats: state.discs.stats,
 */
// skip, count, discs, total, history, fetchDiscs, loadingDiscs
const DiscGalleryPage = ({fetchDiscs, history, loadingDiscs }) => {

  const discsState = useSelector((state) => state.discs);

  const {count, discs, skip, total} = discsState;

  const navigate = useNavigate();
  const location = useLocation();
  console.log('DiscGalleryPage')
  const pageEndRef = useRef(null)
  const queryParams = queryString.parse(location.search)

  const limit = queryParams.limit || 25
  const offset = queryParams.offset || 0
  const type = queryParams.type || null

  const available = queryParams.available || null
  const missing = queryParams.missing || null
  const sold = queryParams.sold || null
  const forSale = queryParams.forSale || null
  const broken = queryParams.broken || null
  const donated = queryParams.donated || null
  const collection = queryParams.collection || null
  const ownStamp = queryParams.ownStamp || null
  const holeInOne = queryParams.holeInOne || null
  const latest = queryParams.latest || null
  const name = queryParams.name || null

  //console.log(`discs: ${JSON.stringify(discs,null,2)}`)



  const scrollToBottom = () => {
    pageEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  const loadMore = () => {
    navigate(
      `${location.pathname}?${queryString.stringify({
        type,
        limit,
        available,
        missing,
        sold,
        forSale,
        broken,
        donated,
        collection,
        ownStamp,
        holeInOne,
        latest,
        name,
        offset: parseInt(offset, 10) + parseInt(limit, 10),
      })}`, {replace: true}
    )
  }

  useEffect(() => {
    fetchDiscs({
      query: {
        type,
        available,
        missing,
        sold,
        forSale,
        broken,
        donated,
        collection,
        ownStamp,
        holeInOne,
        latest,
        name,
      },
      limit,
      offset: offset,
    })
  }, [
    limit,
    offset,
    type,
    available,
    missing,
    sold,
    forSale,
    broken,
    donated,
    collection,
    ownStamp,
    holeInOne,
    latest,
    name,
  ])

  const search = (name) => {
    const queryParams = queryString.parse(location.search)

    queryParams.name = name
    queryParams.offset = 0

    navigate(`${location.pathname}?${queryString.stringify(queryParams)}`, {replace:true})
  }

  const debounceSearch = useCallback(
    debounce(nextValue => search(nextValue), 300),
    []
  )

  const handleChange = value => {
    debounceSearch(value)
  }

  const discCount = parseInt(count, 10) + parseInt(skip, 10)

  if (!discs) {
    return null;
  }

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <SearchField
            id="standard-search"
            label=""
            type="search"
            variant="outlined"
            onKeyUp={e => handleChange(e.target.value)}
            aria-label="Search field"
          />
        </Grid>
      </Grid>

      <DiscsPanel className="disc-gallery-page discs" ref={pageEndRef}>
        <CenterP>
          {discCount < total ? discCount : total} / {total}
        </CenterP>
        <DiscGallery discs={discs} />
      </DiscsPanel>
      {discs.length > 0 && (
        <MorePanel>
          <div>
            <MoreButton
              size="large"
              variant="contained"
              color="primary"
              onClick={() => loadMore()}
              disabled={loadingDiscs}
            >
              {loadingDiscs ? 'Loading...' : 'More...'}
            </MoreButton>
          </div>
        </MorePanel>
      )}
    </div>
  )
}

export default DiscGalleryPage
