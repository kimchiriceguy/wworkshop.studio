import React from 'react';
import './InfiniteMarquee.css';

const InfiniteMarquee = ({
    speed = 25,
    direction = 'left',
    gap = '40px',
    pauseOnHover = false,
    fontSize = '16px',
    fontWeight = 'normal',
    itemPadding = '20px',
    className = '',
    children,
    ...rest
}) => {
    const animationName = direction === 'left' ? 'marquee-scroll-left' : 'marquee-scroll-right';

    // Repeat content multiple times to ensure seamless loop
    const repeatCount = 10; // Increased to ensure full coverage

    const itemStyle = {
        fontSize,
        fontWeight,
        padding: `0 ${itemPadding}`,
    }

    return (
        <div
            className={`infinite-marquee-wrapper ${className}`}
            {...rest}
        >
            <div
                className="infinite-marquee-content"
                style={{
                    animationName,
                    animationDuration: `${speed}s`,
                }}
            >
                {[...Array(repeatCount)].map((_, groupIndex) => (
                    <div key={groupIndex} className="infinite-marquee-group">
                        {React.Children.map(children, (child, i) => (
                            <div
                                key={`${groupIndex}-${i}`}
                                className="infinite-marquee-item"
                                style={itemStyle}
                            >
                                {child}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfiniteMarquee;