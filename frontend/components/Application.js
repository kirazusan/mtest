

import React from 'react';
import ReactDOM from 'react-dom';

class Application extends React.Component {
  createApp = () => {
    const app = React.createElement('div', null, 'Hello World!');
    const root = document.getElementById('root');
    if (root) {
      ReactDOM.render(app, root);
    } else {
      console.error('Root element not found in the DOM');
    }
  };

  render() {
    return React.createElement('div', null, React.createElement('button', { onClick: this.createApp }, 'Create App'));
  }
}

export default Application;