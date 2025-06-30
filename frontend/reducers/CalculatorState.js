

import { createStore, combineReducers } from 'redux';

const initialState = {
  firstNumber: 0,
  secondNumber: 0,
  currentState: 'initial',
  decimalFormat: false,
  currentEntry: ''
};

const resetCalculatorState = () => {
  return { type: 'RESET_CALCULATOR_STATE' };
};

const calculatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_CALCULATOR_STATE':
      return initialState;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  calculator: calculatorReducer
});

const store = createStore(rootReducer);

export { resetCalculatorState, store };