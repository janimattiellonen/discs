import React from 'react'

import Grid from '@material-ui/core/Grid'

import styled from '@emotion/styled'

import { GalleryItem } from './GalleryItem'

const StyledGrid = styled(Grid)({ marginBottom: '30px' })

const DiscGallery = ({ discs }) => (
  <Grid container spacing={2}>
    {discs.map(disc => (
      <StyledGrid item key={`col-${disc._id}`} xs={12} sm={6} lg={4}>
        <GalleryItem disc={disc} />
      </StyledGrid>
    ))}
  </Grid>
)

export default DiscGallery
