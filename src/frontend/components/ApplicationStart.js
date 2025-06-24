

import React, { Component } from 'react';
import axios from 'axios';

class ApplicationStart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: null
    };
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
    this.startApplication();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  startApplication = () => {
    axios.post('/api/start-application')
      .then(response => {
        if (this.mounted) {
          if (response.status === 200) {
            this.setState({ isLoading: false });
          } else {
            this.setState({ error: 'Failed to start application' });
          }
        }
      })
      .catch(error => {
        if (this.mounted) {
          this.setState({ error: 'Error starting application' });
        }
      });
  };

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    } else if (this.state.error) {
      return <div>Error: {this.state.error}</div>;
    } else {
      return <div>Application started successfully!</div>;
    }
  }
}

export default ApplicationStart;