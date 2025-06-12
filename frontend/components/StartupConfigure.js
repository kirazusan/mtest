

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createServer } from 'http';
import { Server } from 'http-proxy-middleware';

const StartupConfigure = () => {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const server = createServer((req, res) => {
      const middlewareDelegate = async () => {
        try {
          const response = await fetch('/api/startup-configure');
          const data = await response.json();
          setResponseData(data);
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Hello World!');
        } catch (error) {
          console.error(error);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error');
        }
      };
      middlewareDelegate();
    });
    server.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  }, []);

  return (
    <div>
      <h1>Hello World!</h1>
      {responseData && <p>Response Data: {responseData}</p>}
    </div>
  );
};

export default StartupConfigure;