package frontend.src;

import React, { useState } from 'react';
import Calculator from './Calculator';

function App() {
    const [error, setError] = useState(null);

    const handleError = (errorMessage) => {
        setError(errorMessage);
    };

    return (
        <div>
            {error && <div className="error">{error}</div>}
            <Calculator onError={handleError} />
        </div>
    );
}

export default App;