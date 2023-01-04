import React from "react";
import './Button.css';
import { isMobile } from 'react-device-detect';

const STYLES = ['white', 'purple', 'gold']

const Button = ({
    btnText,
    type,
    onClick,
    btnStyle,
    long,
    }) => {
        const getButtonStyle = STYLES.includes(btnStyle)
            ? btnStyle
            : STYLES[0];
        const mode = isMobile ? 'mobile' : 'web';
        const length = (isMobile && long) ? 'mobileLong'
                        : (!isMobile && long) ? 'webLong'
                        : 'web';

    return (<button
            className = {`${getButtonStyle} ${length} ${mode}`}
            type={type}
            onClick={onClick}
            >
            {btnText}
            </button>
        )
    };

export default Button;