

import React, { Component } from 'react';
import axios from 'axios';

class CurrentStateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentState: '',
      error: null
    };
  }

  handleUpdateState = (newState) => {
    if (!newState || typeof newState !== 'string') {
      this.setState({ error: 'Invalid new state value' });
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_TOKEN'
      }
    };

    axios.put('/api/update-state', { state: newState }, config)
      .then((response) => {
        if (response.data && response.data.state) {
          this.setState({ currentState: response.data.state, error: null });
        } else {
          this.setState({ error: 'Invalid response from API' });
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };

  render() {
    return (
      <div>
        <p>Current State: {this.state.currentState}</p>
        {this.state.error && <p style={{ color: 'red' }}>{this.state.error}</p>}
        <button onClick={() => this.handleUpdateState('new-state')}>Update State</button>
      </div>
    );
  }
}

export default CurrentStateComponent;