import React from 'react';

import styled from '@emotion/styled';

const Li = styled.li`
    list-style-type: disc;
    margin-left: 1rem;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 1rem;
    grid-row-gap: 0px;

    & > ul {
        padding: 0.75rem;
    }
`;

const ColourBox = styled.div`
    display: flex;
    border: solid red 2px;
    height: 100px;
`;

function canUseBlackColor(r, g, b) {
    const gamma = 2.2;
    const l = 0.2126 * r ** gamma + 0.7152 * g ** gamma + 0.0722 * b ** gamma;

    return l > 0.5 ** gamma;
}

export function ImageProperties({ properties }) {
    const colors = properties?.dominantColors?.colors || [];

    if (!colors) {
        return null;
    }

    return (
        <div>
            <Grid>
                {colors.map((item, key) => (
                    <ul
                        style={{
                            marginBottom: '1rem',
                            background: `rgb(${item.color.red}, ${item.color.green}, ${item.color.blue})`,
                            color: `${
                                canUseBlackColor(item.color.red / 255, item.color.green / 255, item.color.blue / 255)
                                    ? 'black'
                                    : 'white'
                            }`,
                        }}
                    >
                        <li style={{ fontWeight: 'bold' }} key={`color-percentage-${key}`}>
                            {Math.round((item.score * 100 + Number.EPSILON) * 100) / 100}%
                        </li>
                        <Li key={`r-${key}`}>Red: {item.color.red}</Li>
                        <Li key={`g-${key}`}>Green: {item.color.green}</Li>
                        <Li key={`b-${key}`}>Blue: {item.color.blue}</Li>
                    </ul>
                ))}
            </Grid>

            <ColourBox>
                {colors.map((item, key) => (
                    <div
                        key={`colour-box-${key}`}
                        style={{
                            background: `rgb(${item.color.red}, ${item.color.green}, ${item.color.blue})`,
                            width: `${Math.round((item.score * 100 + Number.EPSILON) * 100) / 100}%`,
                            height: '100%',
                        }}
                    >
                        &nbsp;
                    </div>
                ))}
            </ColourBox>
        </div>
    );
}
