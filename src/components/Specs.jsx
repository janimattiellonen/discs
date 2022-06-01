import React from 'react';

import styled from '@emotion/styled';

import { Attribute } from './Attribute';

import { number } from '../util/numbers';

const renderAttribute = (attribute) => {
    return number(attribute);
};

export const Specs = ({ disc }) => {
    if (!disc) {
        return null;
    }

    return (
        <div className="float-left w-full mt-0.5">
            <Attribute title={'Speed'} type={'speed'}>
                {renderAttribute(disc.speed)}
            </Attribute>

            <Attribute title={'Glide'} type={'glide'}>
                {renderAttribute(disc.glide)}
            </Attribute>

            <Attribute title={'Stability'} type={'stability'}>
                {renderAttribute(disc.stability)}
            </Attribute>

            <Attribute title={'Fade'} type={'fade'}>
                {renderAttribute(disc.fade)}
            </Attribute>
        </div>
    );
};
