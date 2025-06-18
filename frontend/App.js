

import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/hello')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        if (data !== 'Hello World!') {
          throw new Error('Invalid response from backend');
        }
        setMessage(data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  return (
    <div>
      {error ? (
        <h1>Error: {error}</h1>
      ) : (
        <h1>{message}</h1>
      )}
    </div>
  );
}

export default App;