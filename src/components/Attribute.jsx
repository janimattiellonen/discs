import React from 'react';

import styled from '@emotion/styled';

import { Typography } from '@mui/material';

const StyledAttribute = styled.div(
    {
        float: 'left',
        width: '50%',
        height: '35%',
        h3: {
            padding: '10px 10px 5px 10px',
        },
        p: {
            fontSize: '2em',
            padding: '10px',
        },
    },
    (props) => {
        if (!props.type) {
            return null;
        }

        switch (props.type) {
            case 'speed': {
                return {
                    background: '#30A46C',
                    // background: '#46af5c',
                };
            }
            case 'glide': {
                return {
                    background: '#F76B15',
                    // background: '#cd9327',
                };
            }
            case 'stability': {
                return {
                    background: '#0090FF',
                    // background: '#24a2dc',
                };
            }
            case 'fade': {
                return {
                    background: '#FFE629',
                    // background: '#e6de47',
                };
            }
            default: {
                return null;
            }
        }
    },
);

export function Attribute({ title, type, children }) {
    return (
        <StyledAttribute type={type}>
            <Typography variant="h3" className="text-base text-center">
                {title}
            </Typography>
            <p className="text-center">{children}</p>
        </StyledAttribute>
    );
}
