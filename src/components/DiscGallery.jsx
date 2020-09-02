import React from 'react'

import Grid from '@material-ui/core/Grid'

import GalleryItem from './GalleryItem'

const DiscGallery = ({ discs }) => (
  <Grid container spacing={2}>
    {discs.map(disc => (
      <Grid item key={`col-${disc._id}`} xs={12} sm={6} lg={4}>
        <GalleryItem disc={disc} />
      </Grid>
    ))}
  </Grid>
)

export default DiscGallery
