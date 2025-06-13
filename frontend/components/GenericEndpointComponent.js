

import React, { Component } from 'react';
import { apiService } from '../services/apiService';

class GenericEndpointComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      error: null,
    };
  }

  componentDidMount() {
    this.handleRequest();
  }

  handleRequest = async () => {
    try {
      const response = await apiService.genericEndpoint();
      this.setState({ data: response.data });
    } catch (error) {
      this.handleError(error);
    }
  };

  handleError = (error) => {
    this.setState({ error: error.message });
    return error.message;
  };

  render() {
    const { data, error } = this.state;
    if (error) {
      return <div>Error: {error}</div>;
    }
    if (!data) {
      return <div>Loading...</div>;
    }
    return <div>Data: {JSON.stringify(data)}</div>;
  }
}

export default GenericEndpointComponent;