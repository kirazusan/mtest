

import React, { Component } from 'react';
import axios from 'axios';

class LockNumberValueComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locked: false,
      numberValue: '',
      error: null,
      isLoading: false
    };
  }

  handleLockNumberValue = (event) => {
    event.preventDefault();
    const { numberValue } = this.state;
    if (numberValue === '') {
      this.setState({ error: 'Number value is required' });
      return;
    }
    if (isNaN(numberValue)) {
      this.setState({ error: 'Number value must be a number' });
      return;
    }
    this.setState({ isLoading: true });
    axios.post('/api/LockNumberValue', { numberValue })
      .then((response) => {
        this.setState({ isLoading: false });
        if (response.data.success) {
          this.setState({ locked: true, error: null });
        } else {
          this.setState({ locked: false, error: 'Failed to lock number value' });
        }
      })
      .catch((error) => {
        this.setState({ isLoading: false, error: 'An error occurred while locking number value' });
      });
  };

  render() {
    const { locked, numberValue, error, isLoading } = this.state;
    return (
      <div>
        <input
          type="number"
          value={numberValue}
          onChange={(event) => this.setState({ numberValue: event.target.value })}
          disabled={locked || isLoading}
        />
        <button onClick={this.handleLockNumberValue} disabled={isLoading}>Lock Number Value</button>
        {locked ? <p>Number value is locked</p> : <p>Number value is not locked</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }
}

export default LockNumberValueComponent;