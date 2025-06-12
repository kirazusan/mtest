

import React from 'react';
import ReactDOM from 'react-dom';
import HelloWorldComponent from './HelloWorldComponent';

const App = () => {
  return (
    <div>
      <HelloWorldComponent />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));