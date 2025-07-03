package frontend.components;

import React, { useState } from 'react';
import axios from 'axios';

const ClearHistoryButton = () => {
    const [responseMessage, setResponseMessage] = useState('');

    const handleClearHistory = async () => {
        try {
            const response = await axios.post('/api/clearHistory');
            setResponseMessage(response.data.message);
        } catch (error) {
            setResponseMessage('Error clearing history');
        }
    };

    return (
        <div>
            <button onClick={handleClearHistory}>Clear Calculation History</button>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default ClearHistoryButton;