import React from "react";
import "./wrapper.css";
import "./CheckScreenSize"
import checkScreenSize from "./CheckScreenSize";

const RecWrapper = ({
    size,
    shading,
    color,
    content,
    }) => {
        const screenSize = checkScreenSize() ? 'portrait' : 'landscape';

        return(<div className={`${screenSize} ${shading} ${size} ${color}`}>
            {content}
            </div>
        );
    }

export default RecWrapper
