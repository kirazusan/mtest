

import React, { useState } from 'react';

class MathOperatorButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mathOperator: ''
    };
  }

  handleClick = () => {
    if (typeof this.props.onClick === 'function') {
      if (typeof this.props.text === 'string') {
        this.setState({ mathOperator: this.props.text });
        this.props.onClick(this.props.text);
      }
    }
  };

  render() {
    return (
      <button onClick={this.handleClick}>{this.props.text}</button>
    );
  }
}

export default MathOperatorButton;