import React, { useState, useEffect } from 'react'

import styled, { ThemeProvider } from 'styled-components'
import NoSsr from '@material-ui/core/NoSsr'
import { createMuiTheme } from '@material-ui/core/styles'
import { palette, spacing, typography } from '@material-ui/system'
import { List } from 'immutable'

import Navigation from '../../Navigation'

const theme = createMuiTheme()

const Box = styled.div`
  ${palette}
  ${spacing}
  ${typography}
  margin: 0 auto;
`

function AppLayout({ children, discs, fetchDiscs, fetchManufacturers, fetchTypes } = props) {
  useEffect(() => {
    fetchDiscs()
  }, [])

  return (
    <NoSsr>
      <ThemeProvider theme={theme}>
        <Box bgcolor="background.paper" fontFamily="h6.fontFamily" p={{ xs: 2, sm: 3, md: 4 }}>
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
