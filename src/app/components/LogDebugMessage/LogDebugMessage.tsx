import React from 'react';
import { LoggingService } from '../services/LoggingService';

class LogDebugMessage extends React.Component {
  message = '';

  handleInputChange = (event) => {
    this.message = event.target.value;
  };

  handleSubmit = async () => {
    try {
      await LoggingService.logDebugMessage(this.message);
      alert('Message logged successfully');
    } catch (error) {
      alert('Failed to log message');
    }
  };

  render() {
    return (
      <div>
        <input type="text" value={this.message} onChange={this.handleInputChange} />
        <button onClick={this.handleSubmit}>Log Message</button>
      </div>
    );
  }
}

export default LogDebugMessage;