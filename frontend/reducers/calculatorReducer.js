

import { UPDATE_CURRENT_ENTRY, UPDATE_RESULT, CLEAR } from '../actions/types';

const initialState = {
  firstNumber: null,
  secondNumber: null,
  currentState: 1,
  decimalFormat: 'N0',
  currentEntry: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR:
      return {
        ...initialState,
        currentState: 1,
        decimalFormat: 'N0'
      };
    case UPDATE_CURRENT_ENTRY:
      if (action.payload === undefined || action.payload === null) {
          return state;
        }
        return { ...state, currentEntry: action.payload };
    case UPDATE_RESULT:
      if (action.payload === undefined || action.payload === null) {
        return state;
      }
      if (action.payload.firstNumber === undefined || action.payload.secondNumber === undefined) {
        return state;
      }
      return {
        ...state,
        firstNumber: action.payload.firstNumber,
        secondNumber: action.payload.secondNumber,
        currentState: 2,
        decimalFormat: 'N2'
      };
    default:
      return state;
  }
}