package frontend;

import React, { useState, useEffect } from 'react';

const ClearHistoryButton = () => {
    const [responseMessage, setResponseMessage] = useState('');

    const handleClearHistory = async () => {
        try {
            const response = await fetch('/api/calculator/clear-history', {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorData = await response.json();
                setResponseMessage(errorData.message || 'Error clearing history');
                return;
            }
            const data = await response.json();
            setResponseMessage(data.message || 'History cleared successfully');
        } catch (error) {
            setResponseMessage('Error clearing history');
        }
    };

    return (
        <div>
            <button onClick={handleClearHistory}>Clear History</button>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default ClearHistoryButton;