/* eslint-disable no-underscore-dangle */

import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CircleIcon from '@mui/icons-material/Circle';
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // background: 'red',
    background: 'hsl(0, 100%, 55%)',
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
        background: 'hsl(0, 100%, 25%)',
        transition: 'background 250ms',
    },
    transition: 'opacity .5s',
    opacity: 0.7,
    borderRadius: '15%',
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

const DiscImage = styled.img`
    border-radius: 5px;
    width: 100%;
    z-index: 2;
`;

const DiscImageCopy = styled(DiscImage)`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;

    @keyframes zoppa {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;

            z-index: 3;
        }
    }
`;

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

const Indicator = styled.div({
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'fit-content',
    padding: '5px',
    height: '25px',
    borderRadius: '12px',
    background: 'hsl(0, 0%, 74%, 0.3)',
    left: '50%',
    right: '50%',
    bottom: '57px', // 15px
    color: 'white',
    transform: 'translate(-50%)',
    zIndex: 5,
});

function SelectedImageIndicator({ imageCount, selectedImage }) {
    const range = [...Array(imageCount).keys()];

    return (
        <Indicator>
            {range.map((item) => {
                if (item === selectedImage) {
                    return <CircleIcon />;
                }

                return <RadioButtonUncheckedIcon key={`indicator-${item}`} />;
            })}
        </Indicator>
    );
}

export function GalleryItem({ disc }) {
    const { isAuthenticated } = useAuth0();
    const [style, setStyle] = useState(null);

    const [selectedImage, setSelectedImage] = useState(0);

    const renderWeight = () => (disc.weight > 0 ? `, ${disc.weight}g` : '');

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

        if (!disc?.image?.length) {
            element = <DiscImage src={unknown} alt="?" />;
        } else {
            const src = `https://testdb-8e20.restdb.io/media/${
                Array.isArray(disc.image) ? disc.image[selectedImage] : disc.image
            }`;

            const nextIndex = selectedImage < disc.image.length ? selectedImage + 1 : 0;

            const copySrc = `https://testdb-8e20.restdb.io/media/${
                Array.isArray(disc.image) ? disc.image[nextIndex] : disc.image
            }`;

            element = (
                <>
                    {Array.isArray(disc.image) && disc.image.length > 1 && (
                        <DiscImageCopy style={style} src={copySrc} alt="" />
                    )}

                    <DiscImage src={src} alt="" />
                </>
            );
        }

        return (
            <>
                {renderTooltip(element)}
                {Array.isArray(disc.image) && disc.image.length > 1 && (
                    <>
                        <LeftBar style={{ left: '10px' }}>
                            <ImageIndex
                                onClick={() => {
                                    if (selectedImage > 0) {
                                        setSelectedImage(selectedImage - 1);
                                    } else {
                                        setSelectedImage(disc.image.length - 1);
                                    }
                                }}
                            >
                                <ArrowBackIosIcon />
                            </ImageIndex>
                        </LeftBar>

                        <RightBar style={{ right: '10px' }}>
                            <ImageIndex
                                onClick={() => {
                                    if (selectedImage < disc.image.length - 1) {
                                        setSelectedImage(selectedImage + 1);
                                    } else {
                                        setSelectedImage(0);
                                    }
                                }}
                            >
                                <ArrowForwardIosIcon />
                            </ImageIndex>
                        </RightBar>
                        <SelectedImageIndicator imageCount={disc.image.length} selectedImage={selectedImage} />
                    </>
                )}
            </>
        );
    };

    const renderLostDisc = () => {
        if (disc.missing) {
            return renderTooltip(<DiscStatus label="Lost" />);
        }

        return null;
    };

    const renderBrokenDisc = () => {
        if (disc.broken) {
            return renderTooltip(<DiscStatus label="Broken" />);
        }

        return null;
    };

    const renderSoldDisc = () => {
        if (disc.sold) {
            return renderTooltip(
                <DiscStatus
                    label={`Sold ${!!disc.sold_for && disc.sold_for > 0 ? ` (${number(disc.sold_for)}€)` : ''}`}
                />,
            );
        }

        return null;
    };

    const renderDonatedDisc = () => {
        if (disc.donated) {
            return renderTooltip(<DiscStatus label="Donated" />);
        }

        return null;
    };

    const renderHioDisc = () => {
        if (disc['Hole in one']) {
            const element = (
                <div className="HoleInOne">
                    <span>Hole in one</span>
                </div>
            );
            return renderHioTooltip(element);
        }

        return null;
    };

    const renderPrice = () => {
        if (disc.price_status === 'gift') {
            return 'Gift';
        }
        if (disc.price_status === 'price_unknown') {
            return 'n/a';
        }
        if (disc.price > 0) {
            return `${currency(disc.price)}`;
        }

        return null;
    };

    return (
        <>
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
                    <span>
                        <span>{disc.name}</span>
                        {isAuthenticated && (
                            <Link to={`/disc/${disc._id}/edit`}>
                                <EditIcon style={{ color: '#337ab7', marginLeft: '8px' }} />
                            </Link>
                        )}
                    </span>
                    {disc.collection_item && <CollectionItem>Collection item</CollectionItem>}
                </DiscName>

                <div className="flex justify-between">
                    <div>
                        <p className="manufacturer">
                            {disc.manufacturer} {disc.material}
                            {renderWeight(disc)}
                        </p>
                        <p className="type">{disc.type}</p>
                        <p />
                    </div>

                    <Price>{renderPrice(disc)}</Price>
                </div>

                <Specs disc={disc} />
            </div>
        </>
    );
}
