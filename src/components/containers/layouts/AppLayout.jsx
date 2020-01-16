import React, { useState, useEffect } from 'react'

import styled, { ThemeProvider } from 'styled-components'
import NoSsr from '@material-ui/core/NoSsr'
import { createMuiTheme, makeStyles } from '@material-ui/core/styles'
import { palette, spacing, typography } from '@material-ui/system'
import { List } from 'immutable'

import Navigation from '../../Navigation'

import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { List as UiList } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const theme = createMuiTheme()

function AppLayout({ children, discs, fetchDiscs, fetchManufacturers, fetchTypes } = props) {
  const showSideNav = useMediaQuery('(min-width:600px)')

  const drawerWidth = showSideNav ? 180 : 0

  const Box = styled.div`
    ${palette}
    ${spacing}
    ${typography}
  `

  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
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

  useEffect(() => {
    fetchDiscs()
  }, [])

  return (
    <NoSsr>
      <ThemeProvider theme={theme}>
        <Box
          className={classes.appBar}
          bgcolor="background.paper"
          fontFamily="h6.fontFamily"
          p={{ xs: 2, sm: 3, md: 4 }}
        >
          <div>
            <Navigation discs={discs} />

            {children}
          </div>
        </Box>
      </ThemeProvider>
    </NoSsr>
  )
}

export default AppLayout
