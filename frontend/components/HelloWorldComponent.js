

import React, { useState, useEffect } from 'react';

const HelloWorldComponent = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/hello');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.text();
        if (data !== 'Hello World!') {
          throw new Error('Invalid response data');
        }
        setMessage(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <h1>{message}</h1>
      )}
    </div>
  );
};

export default HelloWorldComponent;