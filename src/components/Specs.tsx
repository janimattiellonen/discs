import React from 'react';

import { Attribute } from './Attribute';
import { Disc } from '../types';
import { number } from '../util/numbers';

const renderAttribute = (attribute: number | string): string => number(attribute);

interface SpecsProps {
    disc?: Partial<Disc> & {
        speed?: number | string;
        glide?: number | string;
        stability?: number | string;
        fade?: number | string;
    };
}

export function Specs({ disc }: SpecsProps): React.JSX.Element | null {
    if (!disc) {
        return null;
    }

    return (
        <div className="float-left w-full mt-0.5">
            <Attribute title="Speed" type="speed">
                {renderAttribute(disc.speed || 0)}
            </Attribute>

            <Attribute title="Glide" type="glide">
                {renderAttribute(disc.glide || 0)}
            </Attribute>

            <Attribute title="Stability" type="stability">
                {renderAttribute(disc.stability || 0)}
            </Attribute>

            <Attribute title="Fade" type="fade">
                {renderAttribute(disc.fade || 0)}
            </Attribute>
        </div>
    );
}
