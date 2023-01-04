import React from "react";
import './Button.css';

const STYLES = ['btn--white', 'btn--purple', 'btn--gold']
const SIZES = ['btn--normal', 'btn--long', 'btn--mobile']

const Button = ({
    btnText,
    type,
    onClick,
    btnStyle,
    btnSize
    }) => {
        const getButtonStyle = STYLES.includes(btnStyle)
            ? btnStyle
            : STYLES[0];
        const getButtonSize = SIZES.includes(btnSize)
        ? btnSize
        : SIZES[0];

    return (<button
            className = {`${getButtonStyle} ${getButtonSize}`}
            type={type}
            onClick={onClick}
            >
            {btnText}
            </button>
        )
    };

export default Button;