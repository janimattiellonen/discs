import React, { useEffect, useRef, useState } from 'react';

import { ImageProperties } from './ImageProperties';

import discApi from '../api/disc';

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// 64be356d23953a0a00011070

export function Annotation({ disc, image }) {
    const [annotations, setAnnotations] = useState([]);
    const [imagePropertiesAnnotations, setImagePropertiesAnnotations] = useState({});
    const [points, setPoints] = useState([]);
    const [imageWidth, setImageWidth] = useState(1000);
    const canvasRef = useRef();
    const imageRef = useRef();

    // const colours = ['red', 'white', 'blue', 'green', 'black', 'yellow', 'gold', 'pink'];

    const drawRectangle = () => {
        const context = canvasRef.current.getContext('2d');
        context.lineWidth = 1;

        const multiplier = imageWidth / 1000;
        // const multiplier = 1;

        points.forEach((polygon) => {
            // context.strokeStyle = colours[randomIntFromInterval(0, colours.length)];
            context.strokeStyle = 'red';
            context.beginPath();
            context.moveTo(Math.ceil(polygon[0][0] * multiplier), Math.ceil(polygon[0][1] * multiplier));
            for (let item = 1; item < polygon.length; item += 1) {
                context.lineTo(Math.ceil(polygon[item][0] * multiplier), Math.ceil(polygon[item][1] * multiplier));
            }
            context.closePath();
            context.stroke();
        });
    };

    React.useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
        function handleResize() {
            ctx.canvas.height = imageRef.current.clientHeight;
            ctx.canvas.width = imageRef.current.clientWidth;
            setImageWidth(imageRef.current.clientWidth);
            drawRectangle();
        }

        window.addEventListener('resize', handleResize);
    });

    useEffect(() => {
        const fetchData = async () => {
            /* eslint-disable no-underscore-dangle */
            //  const d = await discApi.getDisc('6337281df6a27f7a00019f52'); // 600f2c01d2fe231c0000262d, 64be356d23953a0a00011070
            const a = await discApi.getAnnotationsForDisc(disc._id); // 600f2c01d2fe231c0000262d, 64be356d23953a0a00011070
            /* eslint-enable no-underscore-dangle */

            if (a.data?.length) {
                const { textAnnotations } = JSON.parse(a.data[0].data.text);
                const { imagePropertiesAnnotation } = JSON.parse(a.data[0].data.imageProperties);
                console.log(`woopa: ${JSON.stringify(imagePropertiesAnnotation, null, 2)}`);
                setImagePropertiesAnnotations(imagePropertiesAnnotation);
                setAnnotations(textAnnotations);

                const p = textAnnotations?.map((item) =>
                    item.boundingPoly.vertices.map((vertice) => [vertice.x, vertice.y]),
                );

                setPoints(p || []);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        drawRectangle();
    }, [annotations]);

    return (
        <div>
            {imagePropertiesAnnotations?.dominantColors != null && (
                <ImageProperties properties={imagePropertiesAnnotations} />
            )}

            <div
                style={{
                    marginTop: '4rem',
                    position: 'relative',
                    width: '100%',
                    maxWidth: '1000px',
                    border: 'solid 1px blue',
                }}
            >
                {image && <img ref={imageRef} src={`https://testdb-8e20.restdb.io/media/${image}`} alt="" />}

                <canvas
                    width="1000"
                    height="1000"
                    ref={canvasRef}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        border: 'solid black 1px',
                    }}
                />
            </div>
        </div>
    );
}
