import { createTheme } from '@mui/material/styles';

import { colors } from './theme';

export const muiTheme = createTheme({
    palette: {
        primary: {
            main: '#337ab7',
        },
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: colors.black,
                },
            },
        },
    },

    typography: {
        h1: { fontSize: '2rem', fontWeight: 900 },
        h2: { fontSize: '1.875rem', fontWeight: 900 },
        h3: { fontSize: '1rem', fontWeight: 700 },
    },
});

