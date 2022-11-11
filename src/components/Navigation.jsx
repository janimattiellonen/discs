import React from 'react';
import { Link } from 'react-router-dom';

import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { List as UiList } from '@mui/material';
import ListItem from '@mui/material/ListItem';

import useMediaQuery from '@mui/material/useMediaQuery';

import { currency } from '../util/numbers';

import styled from '@emotion/styled';

const StyledListItem = styled(ListItem)({
    a: { color: '#337ab7' },
});

const StyledTopNav = styled.div({
    header: {
        backgroundColor: 'white',
        paddingTop: '10px',
        paddingBottom: '10px',
    },
    li: {
        color: 'black',
    },
});

const Ul = styled.ul({ padding: 0 });
const Li = styled.li({
    display: 'inline-block',
    marginRight: '20px',
    lineHeight: '30px',
    a: { color: '#337ab7' },
});

export const Navigation = ({ stats }) => {
    const showSideNav = useMediaQuery('(min-width:600px)');

    const getStats = (key) => {
        for (const [k, v] of Object.entries(stats)) {
            if (k === key) {
                return v;
            }
        }

        return null;
    };

    const spentMoney = getStats('spentMoney');

    const getDiscCount = () => getStats('allCount');

    const getFavouriteCount = () => getStats('favouriteCount');

    const getDistanceDriverCount = () => getStats('distanceDriverCount');

    const getAvailableCount = () => getStats('availableCount');

    const getFairwayDriverCount = () => getStats('fairwayDriverCount');

    const getMidrangeCount = () => getStats('midrangeCount');

    const getPutterCount = () => getStats('putterCount');

    const getLostDiscCount = () => getStats('missingCount');

    const getSoldDiscCount = () => getStats('soldCount');

    const getDiscsForSaleCount = () => getStats('forSaleCount');

    const getDonatedDiscCount = () => getStats('donatedCount');

    const getCollectibleCount = () => getStats('collectionCount');

    const getOwnStampCount = () => getStats('ownStampCount');
    const getHoleInOneCount = () => getStats('aceCount');

    const sales = getStats('sales');

    const forSaleCount = getDiscsForSaleCount();

    return (
        <div>
            {showSideNav && (
                <Drawer variant="permanent" anchor="left">
                    <div />
                    <UiList>
                        <StyledListItem>
                            <Link to="/gallery">All ({getDiscCount()})</Link>
                        </StyledListItem>

                        <StyledListItem>
                            <Link to="/gallery?favourite=true">Favourites ({getFavouriteCount()})</Link>
                        </StyledListItem>
                        <StyledListItem>
                            <Link to="/gallery?type=distanceDriver">Distance drivers ({getDistanceDriverCount()})</Link>
                        </StyledListItem>

                        <StyledListItem>
                            <Link to="/gallery?type=fairwayDriver">Fairway drivers ({getFairwayDriverCount()})</Link>
                        </StyledListItem>
                        <StyledListItem>
                            <Link to="/gallery?type=midrange">Midrange ({getMidrangeCount()})</Link>
                        </StyledListItem>
                        <StyledListItem>
                            <Link to="/gallery?type=putter">Putters ({getPutterCount()})</Link>
                        </StyledListItem>
                        <StyledListItem>
                            <Link to="/gallery?available=true">Available ({getAvailableCount()})</Link>
                        </StyledListItem>
                        <StyledListItem>
                            <Link to="/gallery?missing=true">Lost ({getLostDiscCount()})</Link>
                        </StyledListItem>
                        <StyledListItem>
                            <Link to="/gallery?sold=true">Sold ({getSoldDiscCount()})</Link>
                        </StyledListItem>

                        <StyledListItem>
                            <Link to="/gallery?forSale=true">For sale ({forSaleCount})</Link>
                        </StyledListItem>

                        <StyledListItem>
                            <Link to="/gallery?donated=true">Donated ({getDonatedDiscCount()})</Link>
                        </StyledListItem>
                        <StyledListItem>
                            <Link to="/gallery?collection=true">Collection ({getCollectibleCount()})</Link>
                        </StyledListItem>
                        <StyledListItem>
                            <Link to="/gallery?ownStamp=true">Own stamp ({getOwnStampCount()})</Link>
                        </StyledListItem>
                        <StyledListItem>
                            <Link to="/gallery?holeInOne=true">Hole in one ({getHoleInOneCount()})</Link>
                        </StyledListItem>
                        <StyledListItem>
                            <Link to="/gallery?latest=true">Latest (10)</Link>
                        </StyledListItem>
                        {spentMoney > 0 && <StyledListItem>{currency(spentMoney)}</StyledListItem>}

                        {sales > 0 && (
                            <StyledListItem>
                                {currency(sales)}
                                <span style={{ paddingLeft: 5 }}> </span>
                                (sales)
                            </StyledListItem>
                        )}
                    </UiList>
                </Drawer>
            )}

            {!showSideNav && (
                <StyledTopNav>
                    <AppBar position="relative">
                        <Toolbar>
                            <Ul>
                                <Li>
                                    <Link to="/gallery">All ({getDiscCount()})</Link>
                                </Li>
                                <Li>
                                    <Link to="/gallery?favourite=true">Favourites ({getFavouriteCount()})</Link>
                                </Li>
                                <Li>
                                    <Link to="/gallery?type=distanceDriver">
                                        Distance drivers ({getDistanceDriverCount()})
                                    </Link>
                                </Li>
                                <Li>
                                    <Link to="/gallery?type=fairwayDriver">
                                        Fairway drivers ({getFairwayDriverCount()})
                                    </Link>
                                </Li>
                                <Li>
                                    <Link to="/gallery?type=midrange">Midrange ({getMidrangeCount()})</Link>
                                </Li>
                                <Li>
                                    <Link to="/gallery?type=putter">Putters ({getPutterCount()})</Link>
                                </Li>
                                <Li>
                                    <Link to="/gallery?available=true">Available ({getAvailableCount()})</Link>
                                </Li>
                                <Li>
                                    <Link to="/gallery?latest=true">Latest (10)</Link>
                                </Li>
                                {spentMoney > 0 && <Li>{currency(spentMoney)}</Li>}
                                {sales > 0 && <Li>{currency(sales)} (sales)</Li>}
                            </Ul>
                        </Toolbar>
                    </AppBar>
                </StyledTopNav>
            )}
        </div>
    );
};
