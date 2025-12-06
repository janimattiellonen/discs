import React, { useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';

import queryString from 'query-string';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import DiscGallery from './DiscGallery';

import { Filter } from './Filter';

import { theme } from '../util/theme';
import { useDiscs, useReferenceData } from '../contexts';

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
        fontSize: '1rem',
        [theme.mq(1000)]: {
            padding: '8px 22px',
            fontSize: '0.9375rem',
        },
    },
});

const DiscsPanel = styled('div')({
    padding: '0 20px 30px 0',
});

const CenterP = styled.p({
    display: 'flex',
    justifyContent: 'center',
});

const showMoreButton = (discCount: number, total: number): boolean => discCount < total;

export function DiscGalleryPage(): React.JSX.Element | null {
    const { getAccessTokenSilently } = useAuth0();
    const { discs, pagination, fetchDiscs, loading } = useDiscs();
    const { fetchData } = useReferenceData();

    const { count, skip, total } = pagination;

    const navigate = useNavigate();
    const location = useLocation();
    const pageEndRef = useRef<HTMLDivElement>(null);
    const queryParams = queryString.parse(location.search);

    const limit = Number(queryParams.limit) || 25;
    const offset = Number(queryParams.offset) || 0;
    const type = (Array.isArray(queryParams.type) ? queryParams.type[0] : queryParams.type) || null;

    const available = (Array.isArray(queryParams.available) ? queryParams.available[0] : queryParams.available) || null;
    const missing = (Array.isArray(queryParams.missing) ? queryParams.missing[0] : queryParams.missing) || null;
    const sold = (Array.isArray(queryParams.sold) ? queryParams.sold[0] : queryParams.sold) || null;
    const forSale = (Array.isArray(queryParams.forSale) ? queryParams.forSale[0] : queryParams.forSale) || null;
    const broken = (Array.isArray(queryParams.broken) ? queryParams.broken[0] : queryParams.broken) || null;
    const donated = (Array.isArray(queryParams.donated) ? queryParams.donated[0] : queryParams.donated) || null;
    const collection =
        (Array.isArray(queryParams.collection) ? queryParams.collection[0] : queryParams.collection) || null;
    const ownStamp = (Array.isArray(queryParams.ownStamp) ? queryParams.ownStamp[0] : queryParams.ownStamp) || null;
    const holeInOne = (Array.isArray(queryParams.holeInOne) ? queryParams.holeInOne[0] : queryParams.holeInOne) || null;
    const latest = (Array.isArray(queryParams.latest) ? queryParams.latest[0] : queryParams.latest) || null;
    const name = (Array.isArray(queryParams.name) ? queryParams.name[0] : queryParams.name) || null;
    const manufacturer =
        (Array.isArray(queryParams.manufacturer) ? queryParams.manufacturer[0] : queryParams.manufacturer) || null;
    const favourite = (Array.isArray(queryParams.favourite) ? queryParams.favourite[0] : queryParams.favourite) || null;
    const glow = (Array.isArray(queryParams.glow) ? queryParams.glow[0] : queryParams.glow) || null;
    const huk = (Array.isArray(queryParams.huk) ? queryParams.huk[0] : queryParams.huk) || null;

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
                favourite,
                glow,
                huk,
                offset: Number(offset) + Number(limit),
            })}`,
            { replace: true },
        );
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        (async () => {
            await fetchDiscs({
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
                    favourite,
                    glow,
                    huk,
                },
                limit,
                offset,
            });
        })();
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
        favourite,
        glow,
        huk,
        getAccessTokenSilently,
        fetchDiscs,
    ]);

    const handleChange = (value: string): void => {
        navigate(`${location.pathname}?${value}`, { replace: true });
    };

    const discCount = Number(count) + Number(skip);

    if (!discs) {
        return null;
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Filter params={queryParams} handleChange={(url) => handleChange(url)} />
                </Grid>
            </Grid>
            <DiscsPanel className="disc-gallery-page discs" ref={pageEndRef}>
                <CenterP>
                    {discCount < total ? discCount : total} / {total}
                </CenterP>
                <DiscGallery discs={discs} />
            </DiscsPanel>
            {!!showMoreButton(discCount, total) && (
                <MorePanel>
                    <div>
                        <MoreButton
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={() => loadMore()}
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'More...'}
                        </MoreButton>
                    </div>
                </MorePanel>
            )}
        </div>
    );
}
