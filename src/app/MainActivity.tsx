import React, { Component } from 'react';

class MainActivity extends Component {
  state = {
    currentLifecycle: []
  };

  activityLifecycle: string[] = ["OnCreate", "OnStart", "OnResume", "OnPause", "OnStop", "OnDestroy"];

  handleActivityLifecycle = (event: string) => {
    if (!this.state.currentLifecycle.includes(event)) {
      this.setState(prevState => ({
        currentLifecycle: [...prevState.currentLifecycle, event]
      }));
    }
  };

  componentDidMount() {
    this.handleActivityLifecycle("OnCreate");
  }

  render() {
    return (
      <div>
        <h1>Activity Lifecycle Events</h1>
        <ul>
          {this.activityLifecycle.map((event, index) => (
            <li key={index}>{event}: {this.state.currentLifecycle.includes(event) ? 'Handled' : 'Not Handled'}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default MainActivity;