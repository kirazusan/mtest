

import { RESET_CALCULATION_STATE } from '../actions/types';

const initialState = {
  firstNumber: 0,
  secondNumber: 0,
  currentState: 1,
  decimalFormat: 'N0'
};

export default function calculationReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_CALCULATION_STATE:
      return initialState;
    default:
      return state;
  }
}