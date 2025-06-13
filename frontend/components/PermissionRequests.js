

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PermissionRequests = () => {
  const [permissionRequests, setPermissionRequests] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPermissionRequests = async () => {
      try {
        const response = await axios.get('/api/permission-requests');
        if (Array.isArray(response.data)) {
          setPermissionRequests(response.data);
        } else {
          setError('Invalid response data');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPermissionRequests();

    return () => {
      setIsLoading(false);
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Permission Requests</h1>
      <ul>
        {permissionRequests.map(request => (
          <li key={request.id}>
            <p>{request.name}</p>
            <p>{request.email}</p>
            <p>{request.permission}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PermissionRequests;