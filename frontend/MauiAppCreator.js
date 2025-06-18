

import React, { Component } from 'react';
import axios from 'axios';

class MauiAppCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appName: '',
      appDescription: '',
      error: null,
      success: false,
      response: null
    };
  }

  createMauiApp = () => {
    const { appName, appDescription } = this.state;
    if (!appName || !appDescription) {
      this.setState({ error: 'Please fill in all fields' });
      return;
    }
    axios.post('/api/App/CreateMauiApp', {
      name: appName,
      description: appDescription
    })
    .then(response => {
      this.setState({ success: true, response: response.data });
    })
    .catch(error => {
      this.setState({ error: error.message });
    });
  };

  handleInputChange = (event ) => {
    const { name, value } = event.target;
    this.setState({ [name]: value, error: null });
  });

  render() {
    return (
      <div>
        <input
          type="text"
          name="appName"
          value={this.state.appName}
          onChange={this.handleInputChange}
          placeholder="Enter app name"
        />
        <input
          type="text"
          name="appDescription"
          value={this.state.appDescription}
          onChange={this.handleInputChange}
          placeholder="Enter app description"
        />
        <button onClick={this.createMauiApp}>Create Maui App</button>
        {this.state.error && <p style={{ color: 'red' }}>{this.state.error}</p>}
        {this.state.success && <p style={{ color: 'green' }}>Maui App created successfully!</p>}
        {this.state.response && <p>Response: {JSON.stringify(this.state.response)}</p>}
      </div>
    );
  }
}

export default MauiAppCreator;