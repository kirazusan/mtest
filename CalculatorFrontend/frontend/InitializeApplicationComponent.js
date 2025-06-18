

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const InitializeApplicationComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initializeApplication = async () => {
      setLoading(true);
      try {
        const response = await axios.post('/api/initialize-application');
        if (response.status === 200) {
          setInitialized(true);
          dispatch({ type: 'INITIALIZE_APPLICATION_SUCCESS' });
        } else {
          setError('Failed to initialize application');
          dispatch({ type: 'INITIALIZE_APPLICATION_FAILURE' });
        }
      } catch (error) {
        setError(error.message);
        dispatch({ type: 'INITIALIZE_APPLICATION_FAILURE' });
      } finally {
        setLoading(false);
      }
    };

    initializeApplication();
  }, []);

  useEffect(() => {
    if (initialized) {
      history.push('/dashboard');
    }
  }, [initialized]);

  if (loading) {
    return <div>Initializing application...</div>;
  } else if (initialized) {
    return <div>Application initialized successfully.</div>;
  } else if (error) {
    return <div>Error initializing application: {error}</div>;
  } else {
    return <div>Initializing application...</div>;
  }
};

export default InitializeApplicationComponent;