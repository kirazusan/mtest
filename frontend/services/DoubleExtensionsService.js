

import React from 'react';

const DoubleExtensionsService = {
  toTrimmedString: (target, decimalFormat) => {
    if (typeof target !== 'number' || typeof decimalFormat !== 'string') {
      throw new Error('Invalid parameter types');
    }

    if (!target.hasOwnProperty('toTrimmedString')) {
      throw new Error('Target object does not have toTrimmedString method');
    }

    try {
      return target.toTrimmedString(decimalFormat);
    } catch (error) {
      throw new Error(`Error calling toTrimmedString method: ${error.message}`);
    }
  }
};

export default DoubleExtensionsService;