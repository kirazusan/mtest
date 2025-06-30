

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CalculatorDisplay = ({ currentEntry, result }) => {
  const [displayEntry, setDisplayEntry] = useState(currentEntry);
  const [displayResult, setDisplayResult] = useState(result);

  useEffect(() => {
    setDisplayEntry(currentEntry);
  }, [currentEntry]);

  useEffect(() => {
    setDisplayResult(result);
  }, [result]);

  return (
    <div>
      <p id="current-entry">{displayEntry}</p>
      <p id="result">{displayResult}</p>
    </div>
  );
};

CalculatorDisplay.propTypes = {
  currentEntry: PropTypes.string.isRequired,
  result: PropTypes.string.isRequired,
};

export default CalculatorDisplay;