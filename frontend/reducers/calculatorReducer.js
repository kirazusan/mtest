

import { CLEAR, LOCK_NUMBER_VALUE } from '../actions/calculatorActions';

const initialState = {
  firstNumber: '',
  secondNumber: '',
  currentState: '',
  decimalFormat: 'N0',
  currentEntry: ''
};

const calculatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR:
      return initialState;
    case LOCK_NUMBER_VALUE:
      if (typeof action.payload === 'number') {
        return { ...state, currentEntry: action.payload.toLocaleString(state.decimalFormat) };
      } else {
        throw new Error('Invalid payload for LOCK_NUMBER_VALUE action');
      }
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

export default calculatorReducer;