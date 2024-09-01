import './loading-card.css'
import './loading-card-container.css'
import {useEffect, useState} from "react";

const sequence = ['1', '2', '3', '5', '13', '40', '100', '?', 'L', 'O', 'A', 'D', 'I', 'N', 'G'];

const LoadingCard = () => {
    const [sequenceIndex, setSequenceIndex] = useState(0);
    const [rotationAngle, setRotationAngle] = useState(-360);
    const [cardText, setCardText] = useState(sequence[sequenceIndex]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRotationAngle((prev) => prev + 360);
            setSequenceIndex((prevIndex) => {
                const newIndex = (prevIndex + 1) % sequence.length;
                // Make the change of the text not that obvious
                setTimeout(() => {
                    setCardText(sequence[newIndex]);
                }, 200);
                return newIndex;
            });
        }, 1100);

        return () => clearInterval(interval);
    }, []);

    // Start the turning animation right after loading the page
    useEffect(() => {
        const timer = setTimeout(() => {
            setRotationAngle(0);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`loading-card-container`}>
            <div className="loading-card"
                 style={{transform: `perspective(120px) rotateY(${rotationAngle}deg)`}}>
                {cardText}
            </div>
        </div>
    )
}

export default LoadingCard