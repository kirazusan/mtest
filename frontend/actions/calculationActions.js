

import { createStore, combineReducers } from 'redux';

export const RESET_CALCULATION_STATE = 'RESET_CALCULATION_STATE';

export function resetCalculationState() {
  return {
    type: RESET_CALCULATION_STATE,
    payload: null
  };
}

const initialState = {
  firstNumber: 0,
  secondNumber: 0,
  currentState: 1,
  decimalFormat: 'N0'
};

const calculationReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_CALCULATION_STATE:
      return initialState;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  calculation: calculationReducer
});

const store = createStore(rootReducer);

export default store;