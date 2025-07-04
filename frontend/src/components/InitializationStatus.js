package src.components;

import React from 'react';

const InitializationStatus = ({ initializationState }) => {
    let statusMessage;

    switch (initializationState) {
        case 'loading':
            statusMessage = 'Application is initializing...';
            break;
        case 'success':
            statusMessage = 'Application initialized successfully!';
            break;
        case 'error':
            statusMessage = 'There was an error during initialization.';
            break;
        default:
            statusMessage = 'Unknown initialization state.';
    }

    return (
        <div>
            <h2>Initialization Status</h2>
            <p>{statusMessage}</p>
        </div>
    );
};

export default InitializationStatus;