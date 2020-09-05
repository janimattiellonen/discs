import React from 'react'
import numeral from 'numeral'
import { Link } from 'react-router-dom'

import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { createMuiTheme, List as UiList, makeStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import styled from 'styled-components'

export default ({ stats, onSearch }) => {
  const showSideNav = useMediaQuery('(min-width:600px)')

  const Ul = styled.ul`
    padding: 0;
  `
  const Li = styled.li`
    display: inline-block;
    margin-right: 20px;
    line-height: 30px;
  `

  const theme = createMuiTheme()
  const drawerWidth = showSideNav ? 180 : 0

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

  const classes = useStyles()

  const getStats = key => {
    return stats.has(key) ? stats.get(key) : 0
  }

  /*
  availableCount: 205
   */
  const getDiscCount = () => getStats('allCount')

  const getDistanceDriverCount = () => getStats('distanceDriverCount')

  const getAvailableCount = () => getStats('availableCount')

  const getFairwayDriverCount = () => getStats('fairwayDriverCount')

  const getMidrangeCount = () => getStats('midrangeCount')

  const getPutterCount = () => getStats('putterCount')

  const getLostDiscCount = () => getStats('missingCount')

  const getSoldDiscCount = () => getStats('soldCount')

  const getDonatedDiscCount = () => getStats('donatedCount')

  const getCollectibleCount = () => getStats('collectionCount')

  const getOwnStampCount = () => getStats('ownStampCount')

  const getHoleInOneCount = () => getStats('aceCount')

  //const getMoneySpentOnDiscs = () => numeral(getStats('spentMoney')).format('0.00')

  //const getCountForDiscsWithPrice = () => discs.filter(disc => disc.price > 0).count()
  /*
  const getPrice = () => {
    const spentMoney = getMoneySpentOnDiscs()
    const discsWithPrice = getCountForDiscsWithPrice()
    const discCount = getDiscCount()

    return (
      <span>
        {spentMoney} € ({discsWithPrice} / {discCount})
      </span>
    )
  }
*/
  return (
    <div>
      {showSideNav && (
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.toolbar} />
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
              <Link to="/gallery?latest=true">Latest (10)</Link>
            </ListItem>
            {/*<ListItem>{getPrice()}</ListItem>*/}
          </UiList>
        </Drawer>
      )}

      {!showSideNav && (
        <div className="disc-filter">
          <AppBar position="relative" className={classes.appBar}>
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
                  <Link to="/gallery?latest=true">Latest (10)</Link>
                </Li>
                {/*<Li>{getPrice()}</Li>*/}
              </Ul>
            </Toolbar>
          </AppBar>
        </div>
      )}
    </div>
  )
}
