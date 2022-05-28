import React from 'react'
import { Link } from 'react-router-dom'

import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar'
import { List as UiList } from '@mui/material';
import ListItem from '@mui/material/ListItem';

import useMediaQuery from '@mui/material/useMediaQuery';

import {number} from "../util/numbers";

import styled from '@emotion/styled'

const getAsCurrency = value => {
  return <span>{value} €</span>
}

export default ({ stats, onSearch }) => {
  const showSideNav = useMediaQuery('(min-width:600px)')

  const StyledTopNav = styled.div({
    header: {
      backgroundColor: 'white',
    },
  })

  if (1==1) {
    //return <div>NAV</div>
  }

  const Ul = styled.ul`
    padding: 0;
  `
  const Li = styled.li`
    display: inline-block;
    margin-right: 20px;
    line-height: 30px;
  `

  const drawerWidth = showSideNav ? 180 : 0
/*
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    appBar: {
      width: '100%',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      minHeight: '24px',
    },
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  }))
*/
  //const classes = useStyles()

  const getStats = key => {
    for (const [k, v] of Object.entries(stats)) {
      if (k === key) {
        return v;
      }
    }

    return null;
  }

  const spentMoney = number(getStats('spentMoney'))

  const getDiscCount = () => getStats('allCount')

  const getDistanceDriverCount = () => getStats('distanceDriverCount')

  const getAvailableCount = () => getStats('availableCount')

  const getFairwayDriverCount = () => getStats('fairwayDriverCount')

  const getMidrangeCount = () => getStats('midrangeCount')

  const getPutterCount = () => getStats('putterCount')

  const getLostDiscCount = () => getStats('missingCount')

  const getSoldDiscCount = () => getStats('soldCount')

  const getDiscsForSaleCount = () => getStats('forSaleCount')

  const getDonatedDiscCount = () => getStats('donatedCount')

  const getCollectibleCount = () => getStats('collectionCount')

  const getOwnStampCount = () => getStats('ownStampCount')

  const getHoleInOneCount = () => getStats('aceCount')
  const getBrokenCount = () => getStats('brokenCount')

  const sales = number(getStats('sales'))

  const forSaleCount = getDiscsForSaleCount()

  return (
    <div>
      {showSideNav && (
        <Drawer
          variant="permanent"

          anchor="left"
        >
          <div/>
          <UiList>
            <ListItem>
              <Link to="/gallery">All ({getDiscCount()})</Link>
            </ListItem>
            <ListItem>
              <Link to="/gallery?type=distanceDriver">Distance drivers ({getDistanceDriverCount()})</Link>
            </ListItem>

            <ListItem>
              <Link to="/gallery?type=fairwayDriver">Fairway drivers ({getFairwayDriverCount()})</Link>
            </ListItem>
            <ListItem>
              <Link to="/gallery?type=midrange">Midrange ({getMidrangeCount()})</Link>
            </ListItem>
            <ListItem>
              <Link to="/gallery?type=putter">Putters ({getPutterCount()})</Link>
            </ListItem>
            <ListItem>
              <Link to="/gallery?available=true">Available ({getAvailableCount()})</Link>
            </ListItem>
            <ListItem>
              <Link to="/gallery?missing=true">Lost ({getLostDiscCount()})</Link>
            </ListItem>
            <ListItem>
              <Link to="/gallery?sold=true">Sold ({getSoldDiscCount()})</Link>
            </ListItem>

            {
              <ListItem>
                <Link to="/gallery?forSale=true">For sale ({forSaleCount})</Link>
              </ListItem>
            }
            <ListItem>
              <Link to="/gallery?donated=true">Donated ({getDonatedDiscCount()})</Link>
            </ListItem>
            <ListItem>
              <Link to="/gallery?collection=true">Collection ({getCollectibleCount()})</Link>
            </ListItem>
            <ListItem>
              <Link to="/gallery?ownStamp=true">Own stamp ({getOwnStampCount()})</Link>
            </ListItem>
            <ListItem>
              <Link to="/gallery?holeInOne=true">Hole in one ({getHoleInOneCount()})</Link>
            </ListItem>
            <ListItem>
              <Link to="/gallery?broken=true">Broken ({getBrokenCount()})</Link>
            </ListItem>
            <ListItem>
              <Link to="/gallery?latest=true">Latest (10)</Link>
            </ListItem>
            {spentMoney > 0 && <ListItem>{getAsCurrency(spentMoney)}</ListItem>}
            {sales > 0 && (
              <ListItem>
                {getAsCurrency(sales)}
                <span style={{ paddingLeft: 5 }}> </span>
                (sales)
              </ListItem>
            )}
          </UiList>
        </Drawer>
      )}

      {!showSideNav && (
        <StyledTopNav>
          <AppBar position="relative" >
            <Toolbar>
              <Ul>
                <Li>
                  <Link to="/gallery">All ({getDiscCount()})</Link>
                </Li>
                <Li>
                  <Link to="/gallery?type=distanceDriver">Distance drivers ({getDistanceDriverCount()})</Link>
                </Li>
                <Li>
                  <Link to="/gallery?type=fairwayDriver">Fairway drivers ({getFairwayDriverCount()})</Link>
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
                  <Link to="/gallery?missing=true">Lost ({getLostDiscCount()})</Link>
                </Li>
                <Li>
                  <Link to="/gallery?sold=true">Sold ({getSoldDiscCount()})</Link>
                </Li>
                <Li>
                  <Link to="/gallery?forSale=true">For sale ({forSaleCount})</Link>
                </Li>
                <Li>
                  <Link to="/gallery?donated=true">Donated ({getDonatedDiscCount()})</Link>
                </Li>
                <Li>
                  <Link to="/gallery?collection=true">Collection ({getCollectibleCount()})</Link>
                </Li>
                <Li>
                  <Link to="/gallery?ownStamp=true">Own stamp ({getOwnStampCount()})</Link>
                </Li>
                <Li>
                  <Link to="/gallery?holeInOne=true">Hole in one ({getHoleInOneCount()})</Link>
                </Li>
                <Li>
                  <Link to="/gallery?broken=true">Broken ({getBrokenCount()})</Link>
                </Li>
                <Li>
                  <Link to="/gallery?latest=true">Latest (10)</Link>
                </Li>
                {spentMoney > 0 && <Li>{getAsCurrency(spentMoney)}</Li>}
                {sales > 0 && <Li>{getAsCurrency(sales)} (sales)</Li>}
              </Ul>
            </Toolbar>
          </AppBar>
        </StyledTopNav>
      )}
    </div>
  )
}
