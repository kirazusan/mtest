

import React from 'react';
import CurrentStateService from '../services/CurrentStateService';

const CurrentStateComponent = () => {
  const handleUpdateCurrentState = async () => {
    try {
      const response = await CurrentStateService.updateCurrentState();
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <button onClick={handleUpdateCurrentState}>Update Current State</button>
    </div>
  );
};

export default CurrentStateComponent;