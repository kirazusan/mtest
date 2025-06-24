

import { createStore, combineReducers } from 'redux';

const initialState = {
  firstNumber: 0,
  secondNumber: 0,
  currentState: 'initial',
  decimalFormat: '0.00',
  result: 0
};

const calculatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'calculate':
      if (action.operator === '+') {
        return {
          ...state,
          result: parseFloat(action.firstNumber) + parseFloat(action.secondNumber),
          currentState: 'calculated',
          decimalFormat: action.decimalFormat
        };
      } else if (action.operator === '-') {
        return {
          ...state,
          result: parseFloat(action.firstNumber) - parseFloat(action.secondNumber),
          currentState: 'calculated',
          decimalFormat: action.decimalFormat
        };
      } else if (action.operator === '*') {
        return {
          ...state,
          result: parseFloat(action.firstNumber) * parseFloat(action.secondNumber),
          currentState: 'calculated',
          decimalFormat: action.decimalFormat
        };
      } else if (action.operator === '/') {
        if (parseFloat(action.secondNumber) !== 0) {
          return {
            ...state,
            result: parseFloat(action.firstNumber) / parseFloat(action.secondNumber),
            currentState: 'calculated',
            decimalFormat: action.decimalFormat
          };
        } else {
          return {
            ...state,
            result: 'Error: Division by zero',
            currentState: 'error',
            decimalFormat: action.decimalFormat
          };
        }
      } else {
        return {
          ...state,
          result: 'Error: Invalid operator',
          currentState: 'error',
          decimalFormat: action.decimalFormat
        };
      }
    case 'resetCalculatorState':
      return initialState;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  calculator: calculatorReducer
});

const store = createStore(rootReducer);

export default store;