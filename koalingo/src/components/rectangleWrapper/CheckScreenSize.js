import React, {useEffect, useState} from "react";

/**
 * Checks screen size and orientation of its parents window
 * @returns {boolean} true if screen is in portrait mode, false if screen is in landscape mode
 */
const checkScreenSize = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const handleWindowSizeChange = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    return (width<=height);
}

export default checkScreenSize;