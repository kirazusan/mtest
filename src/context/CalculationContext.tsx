import React, { createContext, useContext, useState } from 'react';

const CalculationContext = createContext();

const CalculationProvider = ({ children }) => {
    const [calculationState, setCalculationState] = useState({});

    const updateCalculation = (newCalculation) => {
        setCalculationState(prevState => ({
            ...prevState,
            ...newCalculation
        }));
    };

    return (
        <CalculationContext.Provider value={{ calculationState, updateCalculation }}>
            {children}
        </CalculationContext.Provider>
    );
};

const useCalculation = () => {
    return useContext(CalculationContext);
};

export { CalculationProvider, useCalculation };