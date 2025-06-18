

import React from 'react';

const DoubleExtensions = () => {
    const toTrimmedString = (target, decimalFormat) => {
        if (typeof target !== 'number') {
            throw new Error('Target must be a number');
        }

        if (typeof decimalFormat !== 'string') {
            throw new Error('Decimal format must be a string');
        }

        const formattedString = target.toLocaleString('en-US', { minimumFractionDigits: decimalFormat });
        let trimmedString = formattedString.replace(/0+$/, '').replace(/\.$/, '');
        return trimmedString || '0';
    };

    return {
        toTrimmedString
    };
};

export default DoubleExtensions;