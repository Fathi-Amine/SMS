import React from 'react';

// eslint-disable-next-line react/prop-types
const Button = ({color, bgColor, size, text, borderRadius}) => {
    return (
        <button
            type={"button"}
            style={{color, backgroundColor: bgColor, borderRadius}}
            className={`text-${size} p-3 hover:drop-shadow-xl`}
        >
            {text}
        </button>
    );
};

export default Button;