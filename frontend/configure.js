

package frontend;

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';

const markup = ReactDOMServer.renderToString(<App />);

const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>My App</title>
    </head>
    <body>
      <div id="root">${markup}</div>
    </body>
  </html>
`;

const handleRequest = (req, res) => {
  res.send(html);
};

export default handleRequest;