import React, { useEffect } from 'react'

import NoSsr from '@material-ui/core/NoSsr'

import Navigation from '../../Navigation'

import useMediaQuery from '@material-ui/core/useMediaQuery'

function AppLayout({ children, stats, fetchDiscStats } = props) {
  const showSideNav = useMediaQuery('(min-width:600px)')

  const drawerWidth = showSideNav ? 180 : 0

  useEffect(() => {
    fetchDiscStats()
  }, [])

  return (
    <NoSsr>
      <div>
        <Navigation stats={stats} />

        <div style={{ marginLeft: `${drawerWidth}px` }}>{children}</div>
      </div>
    </NoSsr>
  )
}

export default AppLayout
