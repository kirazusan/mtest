package frontend.components;

import React, { useState } from 'react';

const CreateMauiApp = () => {
    const [mauiAppData, setMauiAppData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const initializeMauiApp = async () => {
        try {
            const response = await fetch('/api/maui-app/init');
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error ${response.status}: ${errorData.message || 'Failed to initialize Maui App'}`);
            }
            const data = await response.json();
            setMauiAppData(data);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.message);
            setMauiAppData(null);
        }
    };

    return (
        <div>
            <button onClick={initializeMauiApp}>Initialize Maui App</button>
            {errorMessage && <p>Error: {errorMessage}</p>}
            {mauiAppData && <p>Success: {JSON.stringify(mauiAppData)}</p>}
        </div>
    );
};

export default CreateMauiApp;