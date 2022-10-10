import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';

import queryString from 'query-string';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import DiscGallery from './DiscGallery';

import { Filter } from './Filter';

import { theme } from '../util/theme';

const MorePanel = styled('div')({
    width: '50%',
    margin: '0 auto',
    paddingTop: '40px',
    marginBottom: '80px',
    clear: 'both',
    textAlign: 'center',
});

const MoreButton = styled(Button)({
    '&.MuiButtonBase-root': {
        padding: '15px 30px',
        fontSize: '1em',
        [theme.mq('1000')]: {
            padding: '8px 22px',
            fontSize: '0.9375rem',
        },
    },
});

const DiscsPanel = styled('div')({
    padding: '0 20px 30px 30px',
});

const CenterP = styled.p({
    display: 'flex',
    justifyContent: 'center',
});

export const DiscGalleryPage = ({ fetchDiscs, fetchDiscData, history, loadingDiscs }) => {
    const discsState = useSelector((state) => state.discs);

    const { count, discs, skip, total } = discsState;

    const navigate = useNavigate();
    const location = useLocation();
    const pageEndRef = useRef(null);
    const queryParams = queryString.parse(location.search);

    const limit = queryParams.limit || 25;
    const offset = queryParams.offset || 0;
    const type = queryParams.type || null;

    const available = queryParams.available || null;
    const missing = queryParams.missing || null;
    const sold = queryParams.sold || null;
    const forSale = queryParams.forSale || null;
    const broken = queryParams.broken || null;
    const donated = queryParams.donated || null;
    const collection = queryParams.collection || null;
    const ownStamp = queryParams.ownStamp || null;
    const holeInOne = queryParams.holeInOne || null;
    const latest = queryParams.latest || null;
    const name = queryParams.name || null;
    const manufacturer = queryParams.manufacturer || null;

    const scrollToBottom = () => {
        pageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    };

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
                manufacturer,
                offset: parseInt(offset, 10) + parseInt(limit, 10),
            })}`,
            { replace: true },
        );
    };

    useEffect(() => {
        fetchDiscData();
    }, []);

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
                manufacturer,
            },
            limit,
            offset: offset,
        });
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
        manufacturer,
    ]);

    const handleChange = (value) => {
        navigate(`${location.pathname}?${value}`, { replace: true });
    };

    const discCount = parseInt(count, 10) + parseInt(skip, 10);

    if (!discs) {
        return null;
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Filter handleChange={(url) => handleChange(url)} />
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
    );
};
