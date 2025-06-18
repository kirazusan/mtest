

import React from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';

const ButtonContainer = ({ buttonValue }) => {
    return (
        <div>
            <Button value={buttonValue} />
        </div>
    );
};

ButtonContainer.propTypes = {
    buttonValue: PropTypes.string.isRequired,
};

ButtonContainer.defaultProps = {
    buttonValue: '',
};

export default ButtonContainer;