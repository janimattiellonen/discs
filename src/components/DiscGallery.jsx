import React from 'react';

import Grid from '@mui/material/Grid';

import styled from '@emotion/styled';

import { GalleryItem } from './GalleryItem';

const StyledGrid = styled(Grid)({ marginBottom: '30px' });

function DiscGallery({ discs }) {
    return (
        <Grid container spacing={2}>
            {discs.map((disc) => (
                // eslint-disable-next-line no-underscore-dangle
                <StyledGrid item key={`col-${disc._id}`} xs={12} sm={6} lg={4}>
                    <GalleryItem disc={disc} />
                </StyledGrid>
            ))}
        </Grid>
    );
}

export default DiscGallery;
