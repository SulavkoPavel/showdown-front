import React, {useEffect, useRef, useState} from 'react';
import './game-resizable-container.css'
import './__content/game-resizable-container__content.css'
import './__bottom/game-resizable-container__bottom.css'
import './__center/game-resizable-container__center.css'

interface Props {
    centerElement: React.ReactNode;
    bottomElement: React.ReactNode;
}

const GameResizableContainer = ({
                                    centerElement,
                                    bottomElement,
                                }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const centerRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState<number>(1);

    const updateScale = () => {
        if (containerRef.current && centerRef.current && bottomRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const containerHeight = containerRef.current.offsetHeight;

            const centerHeight = centerRef.current.offsetHeight;
            const bottomHeight = bottomRef.current.offsetHeight;
            const totalHeight = centerHeight + bottomHeight;

            const contentWidth = Math.max(centerRef.current.offsetWidth, bottomRef.current.offsetWidth);


            const scaleWidth = containerWidth / contentWidth;
            const scaleHeight = containerHeight / totalHeight;

            // Scale down by the smaller scale factor for width and height
            const newScale = Math.min(scaleWidth, scaleHeight, 1);

            setScale(newScale);
        }
    };

    useEffect(() => {
        updateScale();
        window.addEventListener('resize', updateScale);

        return () => {
            window.removeEventListener('resize', updateScale);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="game-resizable-container">
            <div
                className="game-resizable-container__content"
                style={{transform: `scale(${scale})`}}>
                <div
                    ref={centerRef}
                    className="game-resizable-container__center">
                    {centerElement}
                </div>
                <div
                    ref={bottomRef}
                    className="game-resizable-container__bottom">
                    {bottomElement}
                </div>
            </div>
        </div>
    );
};

export default GameResizableContainer;