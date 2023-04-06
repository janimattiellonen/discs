import React, { useEffect } from 'react';

import NoSsr from '@mui/base/NoSsr';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Navigation } from '../../Navigation';

function AppLayout({ children, stats, fetchDiscStats }) {
    const showSideNav = useMediaQuery('(min-width:600px)');

    const drawerWidth = showSideNav ? 220 : 0;

    useEffect(() => {
        fetchDiscStats();
    }, [fetchDiscStats]);

    return (
        <NoSsr>
            <div style={{ paddingLeft: '10px' }}>
                <Navigation stats={stats} />

                <div style={{ marginLeft: `${drawerWidth}px` }}>{children}</div>
            </div>
        </NoSsr>
    );
}

export default AppLayout;
