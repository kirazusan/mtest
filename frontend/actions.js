

export const START_APPLICATION = 'START_APPLICATION';

export function startApplication() {
  return {
    type: START_APPLICATION,
    payload: true
  };
}

export default function reducer(state = { started: false }, action) {
  switch (action.type) {
    case START_APPLICATION:
      if (action.payload !== true) {
        throw new Error('Invalid payload value');
      }
      return { ...state, started: true };
    default:
      return state;
  }
}