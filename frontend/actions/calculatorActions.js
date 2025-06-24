

export const RESET_CALCULATOR_STATE = 'RESET_CALCULATOR_STATE';

const initialState = {
  firstNumber: 0,
  secondNumber: 0,
  currentState: 'initial',
  decimalFormat: '0.00'
};

export function resetCalculatorState() {
  return {
    type: RESET_CALCULATOR_STATE,
    payload: {
      firstNumber: 0,
      secondNumber: 0,
      currentState: 'initial',
      decimalFormat: '0.00'
    }
  };
}