import React, { ReactNode } from 'react';

import styled from '@emotion/styled';

type AttributeType = 'speed' | 'glide' | 'stability' | 'fade';

interface StyledAttributeProps {
    type?: AttributeType;
}

const StyledAttribute = styled.div<StyledAttributeProps>(
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
                    background: '#46af5c',
                };
            }
            case 'glide': {
                return {
                    background: '#cd9327',
                };
            }
            case 'stability': {
                return {
                    background: '#24a2dc',
                };
            }
            case 'fade': {
                return {
                    background: '#e6de47',
                };
            }
            default: {
                return null;
            }
        }
    },
);

interface AttributeProps {
    title: string;
    type: AttributeType;
    children: ReactNode;
}

export function Attribute({ title, type, children }: AttributeProps): React.JSX.Element {
    return (
        <StyledAttribute type={type}>
            <h3 className="text-base text-center">{title}</h3>
            <p className="text-center">{children}</p>
        </StyledAttribute>
    );
}
