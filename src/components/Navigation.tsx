import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { List as UiList } from '@mui/material';
import ListItem from '@mui/material/ListItem';

import useMediaQuery from '@mui/material/useMediaQuery';

import styled from '@emotion/styled';
import { currency } from '../util/numbers';

import { Login } from './Login';

interface DiscStats {
    spentMoney?: number;
    allCount?: number;
    favouriteCount?: number;
    distanceDriverCount?: number;
    fairwayDriverCount?: number;
    midrangeCount?: number;
    putterCount?: number;
    missingCount?: number;
    soldCount?: number;
    forSaleCount?: number;
    donatedCount?: number;
    collectionCount?: number;
    ownStampCount?: number;
    aceCount?: number;
    sales?: number;
    availableCount?: number;
}

interface NavigationProps {
    stats: DiscStats | null;
}

const StyledListItem = styled(ListItem)`
    a {
        color: #337ab7;

        transition: font-size 500ms ease;

        &:hover {
            font-size: 1.3rem;
        }
    }
`;

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

const Ul = styled.ul`
    padding: 0;
`;

const Li = styled.li`
    display: inline-block;
    margin-right: 20px;
    line-height: 30px;

    a {
        color: #337ab7;
    }
`;

export function Navigation({ stats }: NavigationProps): React.JSX.Element {
    const showSideNav = useMediaQuery('(min-width:600px)');
    const { isAuthenticated } = useAuth0();

    const getStats = (key: keyof DiscStats): number | null => (stats && stats[key] ? stats[key] ?? null : null);

    const spentMoney = getStats('spentMoney');

    const getDiscCount = (): number | null => getStats('allCount');

    const getFavouriteCount = (): number | null => getStats('favouriteCount');

    const getDistanceDriverCount = (): number | null => getStats('distanceDriverCount');

    const getAvailableCount = (): number | null => getStats('availableCount');

    const getFairwayDriverCount = (): number | null => getStats('fairwayDriverCount');

    const getMidrangeCount = (): number | null => getStats('midrangeCount');

    const getPutterCount = (): number | null => getStats('putterCount');

    const getLostDiscCount = (): number | null => getStats('missingCount');

    const getSoldDiscCount = (): number | null => getStats('soldCount');

    const getDiscsForSaleCount = (): number | null => getStats('forSaleCount');

    const getDonatedDiscCount = (): number | null => getStats('donatedCount');

    const getCollectibleCount = (): number | null => getStats('collectionCount');

    const getOwnStampCount = (): number | null => getStats('ownStampCount');

    const getHoleInOneCount = (): number | null => getStats('aceCount');

    const sales = getStats('sales');

    const forSaleCount = getDiscsForSaleCount();

    return (
        <>
            {showSideNav && (
                <Drawer variant="permanent" anchor="left">
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
                        {isAuthenticated && spentMoney !== null && spentMoney > 0 && (
                            <StyledListItem>{currency(spentMoney)}</StyledListItem>
                        )}

                        {isAuthenticated && sales !== null && sales > 0 && (
                            <StyledListItem>
                                {currency(sales)}
                                <span style={{ paddingLeft: 5 }}> </span>
                                (sales)
                            </StyledListItem>
                        )}

                        {isAuthenticated && (
                            <StyledListItem>
                                <Link to="/disc/new">Add new disc</Link>
                            </StyledListItem>
                        )}
                    </UiList>
                    <Login />
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
                                {isAuthenticated && spentMoney !== null && spentMoney > 0 && (
                                    <Li>{currency(spentMoney)}</Li>
                                )}
                                {isAuthenticated && sales !== null && sales > 0 && <Li>{currency(sales)} (sales)</Li>}
                            </Ul>
                        </Toolbar>
                    </AppBar>
                </StyledTopNav>
            )}
        </>
    );
}
