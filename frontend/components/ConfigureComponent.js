

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MiddlewareService from '../services/MiddlewareService';

const ConfigureComponent = (props) => {
    const middlewareService = new MiddlewareService();
    const [error, setError] = useState(null);

    useEffect(() => {
        if (props.httpContext) {
            try {
                middlewareService.handleMiddlewareDelegate(props.httpContext);
            } catch (error) {
                setError(error);
            }
        }
    }, [props.httpContext]);

    if (error) {
        return (
            <div>
                <h1>Error: {error.message}</h1>
            </div>
        );
    }

    return (
        <div>
            <h1>Hello World!</h1>
        </div>
    );
};

ConfigureComponent.propTypes = {
    httpContext: PropTypes.object.isRequired,
};

export default ConfigureComponent;