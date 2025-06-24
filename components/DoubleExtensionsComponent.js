

import React, { useState } from 'react';

const DoubleExtensionsComponent = () => {
  const [trimmedString, setTrimmedString] = useState('');

  const render = () => {
    const target = 'target';
    const decimalFormat = 'decimalFormat';
    const url = `/api/doubleextensions?target=${target}&decimalFormat=${decimalFormat}`;

    fetch(url)
      .then(response => response.json())
      .then(data => setTrimmedString(data.trimmedString))
      .catch(error => console.error(error));

    return (
      <p>Trimmed String: {trimmedString}</p>
    );
  };

  return render();
};

export default DoubleExtensionsComponent;