import React, { useEffect, useRef } from 'react';
import VanillaInfiniteMarquee from 'vanilla-infinite-marquee';

/**
 * React wrapper for the `vanilla-infinite-marquee` library.
 *
 * Props:
 * - speed, smoothEdges, direction, gap, duplicateCount, mobileSettings
 * - className: applied to the container element (default: 'marquee-container')
 * - onBeforeInit, onAfterInit: optional callbacks
 * - children: content to render inside the marquee container
 */
const InfiniteMarquee = ({
    speed = 25000,
    smoothEdges = true,
    direction = 'right',
    gap = '15px',
    duplicateCount = 2,
    mobileSettings = { direction: 'top', speed: 20000 },
    className = 'marquee-container',
    onBeforeInit,
    onAfterInit,
    children,
    ...rest
}) => {
    const containerRef = useRef(null);
    const instanceRef = useRef(null);

    useEffect(() => {
        if (typeof window === 'undefined' || !containerRef.current) return;

        try {
            instanceRef.current = new VanillaInfiniteMarquee({
                element: containerRef.current,
                speed,
                smoothEdges,
                direction,
                gap,
                duplicateCount,
                mobileSettings,
                on: {
                    beforeInit: () => {
                        if (onBeforeInit) onBeforeInit();
                    },
                    afterInit: () => {
                        if (onAfterInit) onAfterInit();
                    }
                }
            });
        } catch (err) {
            // fail gracefully in SSR or if library errors
            // eslint-disable-next-line no-console
            console.warn('InfiniteMarquee: failed to initialize', err);
            instanceRef.current = null;
        }

        return () => {
            const inst = instanceRef.current;
            if (!inst) return;
            try {
                if (typeof inst.destroy === 'function') inst.destroy();
                else if (typeof inst.remove === 'function') inst.remove();
                else if (typeof inst.stop === 'function') inst.stop();
            } catch (err) {
                // ignore cleanup errors
            }
            instanceRef.current = null;
        };
    }, [speed, smoothEdges, direction, gap, duplicateCount, JSON.stringify(mobileSettings), onBeforeInit, onAfterInit]);

    return (
        <div ref={containerRef} className={className} {...rest}>
            {children}
        </div>
    );
};

export default InfiniteMarquee;