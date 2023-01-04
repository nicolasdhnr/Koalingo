import React from "react";
import './Button.css';
import { isMobile } from 'react-device-detect';

const STYLES = ['white', 'purple', 'gold','red']

const Button = ({
    btnText,
    onClick,
    btnStyle,
    long,
    short
    }) => {
        const getButtonStyle = STYLES.includes(btnStyle)
            ? btnStyle
            : STYLES[0];
        const mode = isMobile ? 'mobile' : 'web';
        const length = (isMobile && long) ? 'mobileLong'
                        : (!isMobile && long) ? 'webLong'
                        : (isMobile && short) ? 'mobileShort'
                        : (!isMobile && short) ? 'webShort'
                        : 'web';

    return (<button
            className = {`${getButtonStyle} ${length} ${mode}`}
            onClick={onClick}
            >
            {btnText}
            </button>
        )
    };

export default Button;