

import { createStore, combineReducers } from 'redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const CLEAR = 'CLEAR';

const initialState = {
  currentEntry: ''
};

const calculatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR:
      return { ...state, currentEntry: '' };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  calculator: calculatorReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export function clear() {
  return dispatch => {
    dispatch({ type: CLEAR });
  };
}

export function OnClear() {
  console.log('OnClear method triggered');
}

store.subscribe(() => {
  const state = store.getState();
  if (state.calculator.currentEntry === '') {
    OnClear();
  }
});