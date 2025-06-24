

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LockNumberValue = ({ currentNumberValue }) => {
  const [isLocked, setIsLocked] = useState(false);
  const [isLocking, setIsLocking] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentNumberValue === undefined) {
      setError('Current number value is not provided');
    }
  }, [currentNumberValue]);

  const handleLockValue = async () => {
    if (isLocking) return;
    setIsLocking(true);
    try {
      await axios.post('/api/lock-number-value', { currentNumberValue });
      setIsLocked(true);
    } catch (error) {
      setError('Failed to lock the value');
    } finally {
      setIsLocking(false);
    }
  };

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <p>Current Number Value: {currentNumberValue}</p>
      {isLocked ? (
        <p>Value is locked</p>
      ) : (
        <button onClick={handleLockValue} disabled={isLocking}>
          {isLocking ? 'Locking...' : 'Lock Value'}
        </button>
      )}
    </div>
  );
};

export default LockNumberValue;