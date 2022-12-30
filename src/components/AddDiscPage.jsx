import React, { useEffect } from 'react';

import Grid from '@mui/material/Grid';

import { DiscForm } from './DiscForm';

export const AddDiscPage = ({}) => {
    return (
        <div>
            <h1>Add new disc</h1>

            <DiscForm />
        </div>
    );
};
