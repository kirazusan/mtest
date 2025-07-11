package frontend.src.components;

import React from 'react';
import Calculator from './Calculator';
import NumberFormatter from './NumberFormatter';

const MainPage = () => {
    return (
        <div>
            <Calculator />
            <NumberFormatter />
        </div>
    );
};

export default MainPage;