

import React from 'react';
import PropTypes from 'prop-types';

const PermissionRequest = ({ data }) => {
  if (!data) {
    return <div className="permission-request">No data provided</div>;
  }

  const { title, description, permissions } = data;

  if (!title || !description || !permissions) {
    return <div className="permission-request">Invalid data provided</div>;
  }

  if (permissions.length === 0) {
    return <div className="permission-request">No permissions requested</div>;
  }

  try {
    return (
      <div className="permission-request">
        <h2>{title}</h2>
        <p>{description}</p>
        <ul>
          {permissions.map((permission, index) => {
            if (typeof permission !== 'string') {
              throw new Error(`Permission at index ${index} is not a string`);
            }
            return <li key={index}>{permission}</li>;
          })}
        </ul>
      </div>
    );
  } catch (error) {
    return <div className="permission-request">Error rendering permissions: {error.message}</div>;
  }
};

PermissionRequest.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    permissions: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};

export default PermissionRequest;