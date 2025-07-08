package frontend.components.Calculator;

import React, { createContext, useContext, useReducer } from 'react';

const CalculatorContext = createContext();

const initialState = {
    result: 0,
    operation: null,
    operand: null,
};

const calculatorReducer = (state, action) => {
    switch (action.type) {
        case 'SET_OPERAND':
            return { ...state, operand: action.payload };
        case 'SET_OPERATION':
            return { ...state, operation: action.payload };
        case 'CALCULATE':
            const { operand, operation } = state;
            let result;
            switch (operation) {
                case 'ADD':
                    result = state.result + operand;
                    break;
                case 'SUBTRACT':
                    result = state.result - operand;
                    break;
                case 'MULTIPLY':
                    result = state.result * operand;
                    break;
                case 'DIVIDE':
                    result = state.result / operand;
                    break;
                default:
                    result = state.result;
            }
            return { ...state, result, operand: null, operation: null };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
};

export const CalculatorProvider = ({ children }) => {
    const [state, dispatch] = useReducer(calculatorReducer, initialState);

    return (
        <CalculatorContext.Provider value={{ state, dispatch }}>
            {children}
        </CalculatorContext.Provider>
    );
};

export const useCalculator = () => {
    return useContext(CalculatorContext);
};