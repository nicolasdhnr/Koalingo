import React from "react";
import './button.css';
import checkScreenSize from "../rectangleWrapper/CheckScreenSize";

const STYLES = ['white', 'purple', 'gold', 'red', 'bgColor', 'transparent']
/**
 * Button component
 * @param {string} btnText - text to be displayed on the button
 * @param {function} onClick - function to be called when button is clicked
 * @param {string} btnStyle - style of the button
 * @param {string} length - length of the button
 * @returns {JSX.Element} Styled button
 */
const Button = ({
    btnText,
    onClick,
    btnStyle,
    length,
}) => {
    // Check if the button style and screen size is valid
    const getButtonStyle = STYLES.includes(btnStyle)
        ? btnStyle
        : STYLES[0];  // Default to white
    const screenSize = checkScreenSize() ? 'btnPortrait' : 'btnLandscape';

    return (<button
        className={`${getButtonStyle} ${screenSize} ${length}`}
        onClick={onClick}
        data-testid='button'
    >
        {btnText}
    </button>
    )
};

export default Button;