import React from 'react';

import styled from '@emotion/styled';

const StyledDiv = styled.div({
  background: 'red',
  bottom: 0,
  height: '50px',
  left: 0,
  opacity: 0.7,
  position: 'absolute',
  transition: 'opacity .5s',
  width: '100%',
});

const WrapperDiv = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  flexFlow: 'column-reverse',
  flex: '1 100%',
});

const StyledSpan = styled.span({
  display: 'block',
  textAlign: 'center',
  fontSize: '1em',
  '@media (min-width: 768px)': { fontSize: '2em' },
});

export function DiscStatus({ label }) {
  return (
    <StyledDiv>
      <WrapperDiv>
        <StyledSpan>{label}</StyledSpan>
      </WrapperDiv>
    </StyledDiv>
  );
}
