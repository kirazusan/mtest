import { useState } from 'react';
import { CalculationResult } from '../types/CalculationTypes';

const useCalculation = () => {
    const [result, setResult] = useState<CalculationResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const calculate = (input: number) => {
        try {
            if (isNaN(input)) {
                throw new Error('Input must be a number');
            }
            const calculation = input * 2;
            setResult({ value: calculation });
            setError(null);
        } catch (err) {
            setError(err.message);
            setResult(null);
        }
    };

    const reset = () => {
        setResult(null);
        setError(null);
    };

    return { result, error, calculate, reset };
};

export default useCalculation;