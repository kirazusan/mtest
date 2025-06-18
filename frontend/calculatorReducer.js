

export default function calculatorReducer(state = {}, action) {
    if (typeof state !== 'object') {
        throw new Error('State must be an object');
    }

    if (!action || !action.type) {
        throw new Error('Action must be an object with a type property');
    }

    switch (action.type) {
        case 'SELECT_NUMBER':
            if (!action.payload) {
                throw new Error('Action payload must be defined for SELECT_NUMBER action');
            }
            return { ...state, selectedNumber: action.payload };
        default:
            return state;
    }
}