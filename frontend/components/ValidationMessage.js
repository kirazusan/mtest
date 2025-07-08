package frontend.components;

import React from 'react';
import PropTypes from 'prop-types';

const ValidationMessage = ({ message }) => {
    return message ? <div className="validation-message">{message}</div> : null;
};

ValidationMessage.propTypes = {
    message: PropTypes.string
};

ValidationMessage.defaultProps = {
    message: ''
};

export default ValidationMessage;