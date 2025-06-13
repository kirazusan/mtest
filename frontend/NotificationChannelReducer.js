

import { createStore, combineReducers } from 'redux';

const initialState = {
  notificationChannel: null,
  error: null,
  isLoading: false,
};

const notificationChannelReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_NOTIFICATION_CHANNEL_REQUEST':
      return { ...state, isLoading: true };
    case 'CREATE_NOTIFICATION_CHANNEL_SUCCESS':
      if (!action.payload) {
        throw new Error('Action payload is required for CREATE_NOTIFICATION_CHANNEL_SUCCESS');
      }
      return { ...state, notificationChannel: action.payload, isLoading: false };
    case 'CREATE_NOTIFICATION_CHANNEL_FAILURE':
      if (!action.payload) {
        throw new Error('Action payload is required for CREATE_NOTIFICATION_CHANNEL_FAILURE');
      }
      return { ...state, error: action.payload, isLoading: false };
    default:
      if (!action.type) {
        throw new Error('Action type is required');
      }
      return state;
  }
};

const rootReducer = combineReducers({
  notificationChannel: notificationChannelReducer,
});

const store = createStore(rootReducer);

export default store;