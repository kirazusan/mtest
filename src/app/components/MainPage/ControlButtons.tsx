import React from 'react';

const ControlButtons = ({ calculate, setTheme, logError }) => {
    return (
        <div className="control-buttons">
            <button onClick={() => calculate({ operation: 'add', operands: [1, 2] })}>
                Calculate
            </button>
            <button onClick={() => setTheme({ theme: 'light' })}>
                Theme Change Button
            </button>
            <button onClick={() => logError({ message: 'An error occurred during calculation.' })}>
                Log Error
            </button>
        </div>
    );
};

export default ControlButtons;