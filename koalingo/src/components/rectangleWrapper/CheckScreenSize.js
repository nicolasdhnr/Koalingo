import React, {useEffect, useState} from "react";

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