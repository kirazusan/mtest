

import React from 'react';

class ConfigureComponent extends React.Component {
  handleRequest = async (req, res) => {
    try {
      await res.writeAsync('Hello World!');
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return <div>Hello World!</div>;
  }
}

export default ConfigureComponent;