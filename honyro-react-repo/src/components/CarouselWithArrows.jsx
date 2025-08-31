import React, { useState } from 'react';
import './CarouselWithArrows.css';

export function CarouselWithArrows({ children }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [direction, setDirection] = useState("right"); 

    const total = React.Children.count(children);

    const prev = () => {
        if (isAnimating) return;
        setDirection("left");
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex((i) => (i - 1 + total) % total);
            setIsAnimating(false);
        }, 400); // duración de la animación en ms
    };
    
    const next = () => {
        if (isAnimating) return;
        setDirection("right");
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex((i) => (i + 1) % total);
            setIsAnimating(false);
        }, 400);
    };

    return (
        <div className="arrow-carousel-container">
            <button className="arrow left" onClick={prev}>
                <span className="material-symbols-outlined">chevron_left</span>
            </button>

            <div className="carousel-window">
                <div
                    className="carousel-track"

                >
                    {React.Children.map(children, (child, i) => {
                        const position = (i - currentIndex + total) % total;
                        const animClass = isAnimating ? 

                        (direction === "right" ? 
                            "slide-left" : 
                            "slide-right") : 
                            "";

                        return (
                            <div
                                className={'item ' + animClass}
                                style={{
                                    gridColumnStart: position + 1,
                                }}
                            >
                                {child}
                            </div>
                        );
                    })}
                </div>
            </div>

            <button className="arrow right" onClick={next}>
                <span className="material-symbols-outlined">chevron_right</span>
            </button>
        </div>
    );
}
