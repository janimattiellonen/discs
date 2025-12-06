import React, { ReactNode, useEffect } from 'react';

import NoSsr from '@mui/base/NoSsr';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Navigation } from '../../Navigation';
import { useReferenceData } from '../../../contexts';

interface AppLayoutProps {
    children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps): React.JSX.Element {
    const showSideNav = useMediaQuery('(min-width:600px)');
    const { stats, fetchStats } = useReferenceData();

    const drawerWidth = showSideNav ? 220 : 0;

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

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
