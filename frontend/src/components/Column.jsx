import React from 'react';

const Column = ({isColumnOver, children}) => {
    const colBgColor = isColumnOver ? 'bg-blue-300' : '';
    return (
        <div className={`${colBgColor}`}>
            {children}
        </div>
    );
};

export default Column;