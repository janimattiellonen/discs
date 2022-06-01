import React, { useEffect } from 'react';

import NoSsr from '@mui/base/NoSsr';
import Navigation from '../../Navigation';

import useMediaQuery from '@mui/material/useMediaQuery';

function AppLayout({ children, stats, fetchDiscStats }) {
    const showSideNav = useMediaQuery('(min-width:600px)');

    const drawerWidth = showSideNav ? 180 : 0;

    useEffect(() => {
        fetchDiscStats();
    }, []);

    return (
        <NoSsr>
            <div>
                <Navigation stats={stats} />

                <div style={{ marginLeft: `${drawerWidth}px` }}>{children}</div>
            </div>
        </NoSsr>
    );
}

export default AppLayout;
