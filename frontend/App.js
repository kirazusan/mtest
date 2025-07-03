package frontend;

import React, { useEffect, useState } from 'react';
import DoubleTrimmedDisplay from './DoubleTrimmedDisplay';
import Calculator from './Calculator';
import ClearHistoryButton from './ClearHistoryButton';

const App = () => {
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const initializeApp = async () => {
            setIsInitialized(true);
        };
        initializeApp();
    }, []);

    return (
        <div>
            {isInitialized ? (
                <>
                    <DoubleTrimmedDisplay />
                    <Calculator />
                    <ClearHistoryButton />
                </>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default App;