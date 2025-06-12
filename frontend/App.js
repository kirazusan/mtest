

import React, { useState, useEffect } from 'react';
import ConfigureComponent from './ConfigureComponent';
import MiddlewareService from './MiddlewareService';

function App() {
  const [httpContext, setHttpContext] = useState({});
  const [middlewareDelegate, setMiddlewareDelegate] = useState(null);

  const middlewareService = new MiddlewareService(httpContext);

  const handleMiddlewareDelegate = (delegate) => {
    setMiddlewareDelegate(delegate);
  };

  useEffect(() => {
    if (middlewareDelegate) {
      middlewareService.handleMiddlewareDelegate(middlewareDelegate);
    }
  }, [middlewareDelegate]);

  return (
    <div>
      <ConfigureComponent httpContext={httpContext} handleMiddlewareDelegate={handleMiddlewareDelegate} />
    </div>
  );
}

export default App;