import React from "react";
import './button.css';
import checkScreenSize from "../rectangleWrapper/CheckScreenSize";

const STYLES = ['white', 'purple', 'gold','red','bgColor','transparent']

const Button = ({
    btnText,
    onClick,
    btnStyle,
    length,
    }) => {
        const getButtonStyle = STYLES.includes(btnStyle)
            ? btnStyle
            : STYLES[0];
        const screenSize = checkScreenSize() ? 'btnPortrait' : 'btnLandscape';

    return (<button
            className = {`${getButtonStyle} ${screenSize} ${length}`}
            onClick={onClick}
            >
            {btnText}
            </button>
        )
    };

export default Button;