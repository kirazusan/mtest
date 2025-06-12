

import React, { useState, useEffect } from 'react';

const HelloWorldComponent = () => {
  const [message, setMessage] = useState('');

  const handleRequest = async () => {
    setMessage('Hello World!');
    await writeResponse(message);
  };

  const fetchMessage = async () => {
    try {
      const response = await fetch('/api/message');
      if (response.ok) {
        const data = await response.text();
        setMessage(data);
      } else {
        throw new Error(`Failed to fetch message: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
      setMessage('Error fetching message');
    }
  };

  const writeResponse = async (message) => {
    try {
      const response = new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          resolve();
        }, 1000);
      });
      await response;
      console.log(message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleRequest();
  }, []);

  return (
    <div>
      <button onClick={handleRequest}>Handle Request</button>
      <button onClick={fetchMessage}>Fetch Message</button>
      <p>{message}</p>
    </div>
  );
};

export default HelloWorldComponent;