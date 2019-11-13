import React from 'react';

import styled, { ThemeProvider } from 'styled-components';
import NoSsr from '@material-ui/core/NoSsr';
import { createMuiTheme } from '@material-ui/core/styles';
import { palette, spacing, typography } from '@material-ui/system';


const theme = createMuiTheme();

const Box = styled.div`
  ${palette}
  ${spacing}
  ${typography}
  background: #ddd;
  margin: 0 auto;
`;

const Div = styled.div`
`

function AppLayout( { children } ) {
  return (
    <NoSsr>
      <ThemeProvider theme={theme}>
        <Box
          color="primary.main"
          bgcolor="background.paper"
          fontFamily="h6.fontFamily"
          fontSize={{ xs: 'h6.fontSize', sm: 'h4.fontSize', md: 'h3.fontSize' }}
          p={{ xs: 2, sm: 3, md: 4 }}
        >
          <div>
            {children}
          </div>
        </Box>
      </ThemeProvider>
    </NoSsr>
  );
}

export default AppLayout;
