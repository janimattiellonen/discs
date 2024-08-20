import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import discApi from '../api/disc';

import { Annotation } from './Annotation';

const Title = styled(DialogTitle)`
    font-weight: bold;
    font-size: 2rem;
`;

function createTitle(disc) {
    const manufacturer = disc.manufacturer ? disc.manufacturer : '';
    const material = disc.material ? disc.material : '';
    const weight = disc.weight ? `, ${disc.weight}g` : '';



    return `${manufacturer} ${material} ${disc.name}${weight}`.replace(/\s{2,}/g, ' ');
}
export function DiscDialog({ disc, image, onClose, open }) {
    const [fullWidth, setFullWidth] = useState(true);

    useEffect(() => {}, []);

    return (
        <div>
            <Dialog fullWidth={fullWidth} maxWidth="xl" open={open} onClose={onClose}>
                {' '}
                <Title component="h1">{createTitle(disc)}</Title>
                <DialogContent style={{ display: 'flex', justifyContent: 'center' }}>
                    {/* <img src={`https://testdb-8e20.restdb.io/media/${image}`} alt="" /> */}

                    <Annotation disc={disc} image={image} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
