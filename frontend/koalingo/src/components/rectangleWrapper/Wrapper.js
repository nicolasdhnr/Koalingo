import React from "react";
import "./wrapper.css";
import "./CheckScreenSize"
import checkScreenSize from "./CheckScreenSize";

const RecWrapper = ({
    size,
    shading,
    children1,
    children2
    }) => {
        const screenSize = checkScreenSize() ? 'portrait' : 'landscape';

        return(<div className={`${screenSize} ${shading} ${size}`}>
            {children1}
            {children2}
            </div>
        );
    }

export default RecWrapper
