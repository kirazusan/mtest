import React from 'react';

class MainApplication extends React.Component {
  static Calculate(value1, value2, mathOperator) {
    let result = 0;
    switch (mathOperator) {
      case '÷':
        result = value1 / value2;
        break;
      case '×':
        result = value1 * value2;
        break;
      case '+':
        result = value1 + value2;
        break;
      case '-':
        result = value1 - value2;
        break;
      default:
        result = 0;
    }
    return result;
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Calculator</h1>
      </div>
    );
  }
}

export default MainApplication;