

import { createStore, combineReducers } from 'redux';

const initialState = {
  started: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'START':
      return { ...state, started: true };
    case 'STOP':
      return { ...state, started: false };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;