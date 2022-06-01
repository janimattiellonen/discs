import React, { useState } from 'react';
import _ from 'lodash';
import Tooltip from '@mui/material/Tooltip';
import { format } from 'date-fns';
import styled from '@emotion/styled';

import { currency, number } from '../util/numbers';

import { DiscStatus } from './DiscStatus';

import { Specs } from './Specs';

import unknown from '../unknown.png';

const CollectionItem = styled.div({
    fontWeight: 'bold',
    fontSize: '0.6em',
});

const ImageIndex = styled.div({
    display: 'inline-block',
    background: 'red',
    height: '50px',
    fontSize: '2em',
    width: '50px',
    textAlign: 'center',
    verticalAlign: 'middle',
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
    '&:hover': {
        cursor: 'pointer',
    },
    transition: 'opacity .5s',
    opacity: 0.7,
});

const VerticalBar = styled.div({
    bottom: 0,
    position: 'absolute',
    height: '100%',
    zIndex: 9999,
    width: '50px',
});

const LeftBar = styled(VerticalBar)({
    left: 0,
});

const RightBar = styled(VerticalBar)({
    right: 0,
});

const DiscImage = styled.div({});

const DiscName = styled.h2({
    display: 'flex',
    fontSize: '1.875rem',
    justifyContent: 'space-between',
    alignItems: 'center',
});

const Price = styled.div({
    float: 'right',
    fontSize: '2em',
    fontWeight: 'normal',
});

export const GalleryItem = ({ disc }) => {
    const [selectedImage, setSelectedImage] = useState(0);

    const renderWeight = (disc) => (disc.weight > 0 ? `, ${disc.weight}g` : '');

    const renderOverlayTrigger = (tooltip, element) => element;

    const renderTooltip = (element) => {
        if (
            (!disc.missing_description || disc.missing_description.length === 0) &&
            (!disc['Donation description'] || disc['Donation description'].length === 0)
        ) {
            return element;
        }

        const tooltip = (
            <Tooltip id={`tooltip-disc-${disc.id}`} placement="bottom">
                <span>{disc.missing_description || disc['Donation description']}</span>
            </Tooltip>
        );

        return renderOverlayTrigger(tooltip, element);
    };

    const renderHioTooltip = (element) => {
        if (!disc['HIO date']) {
            return element;
        }

        const tooltip = (
            <Tooltip id={`tooltip-disc-hio-${disc.id}`}>
                <span>{format(new Date(disc['HIO date']), 'DD.MM.YYYY')}</span>
            </Tooltip>
        );

        return renderOverlayTrigger(tooltip, element);
    };

    const renderImage = () => {
        let element = null;

        if (_.isEmpty(disc.image)) {
            element = <img src={unknown} alt="?" />;
        } else {
            let src = `https://testdb-8e20.restdb.io/media/${disc.image[selectedImage]}`;
            element = <img src={src} alt="" />;
        }

        return (
            <>
                {renderTooltip(element)}{' '}
                {!!disc.image && disc.image.length > 1 && (
                    <>
                        <LeftBar>
                            <ImageIndex onClick={() => setSelectedImage(0)}>1</ImageIndex>
                        </LeftBar>
                        <RightBar>
                            <ImageIndex onClick={() => setSelectedImage(1)}>2</ImageIndex>
                        </RightBar>
                    </>
                )}
            </>
        );
    };

    const renderAttribute = (attribute) => {
        return number(attribute);
    };

    const renderLostDisc = () => {
        if (disc.missing) {
            return renderTooltip(<DiscStatus label={'Lost'} />);
        }
    };

    const renderBrokenDisc = () => {
        if (disc.broken) {
            return renderTooltip(<DiscStatus label={'Broken'} />);
        }
    };

    const renderSoldDisc = () => {
        if (disc.sold) {
            return renderTooltip(
                <DiscStatus
                    label={`Sold ${!!disc.sold_for && disc.sold_for > 0 ? ` (${number(disc.sold_for)}€)` : ''}`}
                />,
            );
        }
    };

    const renderDonatedDisc = () => {
        if (disc.Donated) {
            return renderTooltip(<DiscStatus label={'Donated'} />);
        }
    };

    const renderHioDisc = () => {
        if (disc['Hole in one']) {
            let element = (
                <div className="HoleInOne">
                    <span>Hole in one</span>
                </div>
            );
            return renderHioTooltip(element);
        }
    };

    const renderPrice = () => {
        if (disc.price_status === 'gift') {
            return 'Gift';
        } else if (disc.price_status === 'price_unknown') {
            return 'n/a';
        } else if (disc.price > 0) {
            return `${currency(disc.price)}`;
        }
    };

    return (
        <div>
            <div className="flex w-auto relative">
                {renderImage()}

                {renderLostDisc()}

                {renderSoldDisc()}

                {renderDonatedDisc()}

                {renderBrokenDisc()}

                {renderHioDisc()}
            </div>

            <div>
                <DiscName>
                    {disc.name}&nbsp;{disc.collection_item && <CollectionItem>Collection item</CollectionItem>}
                </DiscName>

                <div className="float-left">
                    <p className="manufacturer">
                        {disc.manufacturer} {disc.material}
                        {renderWeight(disc)}
                    </p>
                    <p className="type">{disc.type}</p>
                    <p />
                </div>
                <Price>{renderPrice(disc)}</Price>

                <Specs disc={disc} />
            </div>
        </div>
    );
};
