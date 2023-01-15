import React from "react";
import "./wrapper.css";
import "./CheckScreenSize"
import checkScreenSize from "./CheckScreenSize";

/**
 * Provides a white rectangle to wrap other components in
 * @param {string} size - size of the rectangle
 * @param {string} shading - shading of the rectangle
 * @param {string} color - color of the rectangle
 * @param {JSX.Element} content - content to be displayed inside the rectangle 
 * @returns {JSX.Element}
 */
const RecWrapper = ({
    size,
    shading,
    color,
    content,
    }) => {
        const screenSize = checkScreenSize() ? 'portrait' : 'landscape';

        return( <div 
            data-testid="recWrapper"
            className={`${screenSize} ${shading} ${size} ${color}`}>
            {content}
            </div>
        );
    }

export default RecWrapper
