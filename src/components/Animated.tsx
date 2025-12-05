import React, { ReactNode, useCallback, useEffect, useState } from 'react';
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

interface AnimatedProps {
    children: ReactNode;
    keyValue: string | number;
}

export const Animated = function ({ children, keyValue }: AnimatedProps): React.JSX.Element {
    const [, updateState] = useState<Record<string, never>>();
    const forceUpdate = useCallback(() => updateState({}), []);

    useEffect(() => {
        forceUpdate();
    }, [forceUpdate]);
    return <AnimatedDiv key={keyValue}>{children}</AnimatedDiv>;
};
