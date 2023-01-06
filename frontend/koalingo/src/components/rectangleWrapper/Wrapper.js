import React from "react";
import "./wrapper.css";
import "./CheckScreenSize"
import checkScreenSize from "./CheckScreenSize";

const RecWrapper = ({
    size,
    shading,
    children1,
    children2,
    children3,
    children4,
    children5,
    children6,
    children7,
    children8,
    children9
    }) => {
        const screenSize = checkScreenSize() ? 'portrait' : 'landscape';

        return(<div className={`${screenSize} ${shading} ${size}`}>
            {children1}
            {children2}
            {children3}
            {children4}
            {children5}
            {children6}
            {children7}
            {children8}
            {children9}
            </div>
        );
    }

export default RecWrapper
