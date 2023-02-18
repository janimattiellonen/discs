import React from 'react';

import styled from '@emotion/styled';

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const RemoveCircle = styled(RemoveCircleOutlineIcon)({
    position: 'absolute',
    right: '5px',
    bottom: '5px',
    background: 'hsl(347deg 100% 50% / 0.6)',
    padding: '10px',
    width: '50px',
    height: '50px',
    '&:hover': {
        cursor: 'pointer',
        background: 'hsl(347deg 100% 50% / 0.8)',
    },
});

const Image = styled.div({
    position: 'relative',
    width: '400px',
    height: '400px',
    marginBottom: '10px',
    backgroundRepeat: 'no',
    backgroundSize: 'contain',
});

export function DraggableImage({ url, onRemove }) {
    return (
        <Image
            style={{
                backgroundImage: url,
            }}
        >
            <RemoveCircle titleAccess="Remove image from disc" onClick={() => onRemove()} />
        </Image>
    );
}
