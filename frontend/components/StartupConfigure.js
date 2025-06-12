

import React, { Component } from 'react';
import RequestPipeline from '../RequestPipeline';
import Middleware from '../Middleware';
import { IApplicationBuilder } from '../IApplicationBuilder';

class StartupConfigure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responseContent: ''
    };
  }

  configure = (app) => {
    try {
      const pipeline = new RequestPipeline();
      pipeline.configure(app);
      this.setState({ responseContent: 'Configuration successful' });
    } catch (error) {
      this.setState({ responseContent: 'Error during configuration: ' + error.message });
    }
  };

  componentDidMount() {
    const app = new IApplicationBuilder();
    this.configure(app);
  }

  render() {
    return <div>{this.state.responseContent}</div>;
  }
}

export default StartupConfigure;