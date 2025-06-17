

import React, { useState, useEffect } from 'react';

const HelloWorld = () => {
  const [message, setMessage] = useState('Hello World!');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/message')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        if (data !== 'Hello World!') {
          setError('Invalid message received from API');
        } else {
          setMessage(data);
        }
      })
      .catch(error => setError(error.message));
  }, []);

  return (
    <div>
      {error ? (
        <h1 style={{ color: 'red' }}>{error}</h1>
      ) : (
        <h1>{message}</h1>
      )}
    </div>
  );
};

export default HelloWorld;