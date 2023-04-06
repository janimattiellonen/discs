import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';

const AnimatedDiv = styled.div`
    @keyframes feppa {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

    animation: feppa 1000ms linear forwards;
`;
export const Animated = function ({ children, keyValue }) {
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    useEffect(() => {
        forceUpdate();
    }, [forceUpdate]);
    return <AnimatedDiv key={keyValue}>{children}</AnimatedDiv>;
};
