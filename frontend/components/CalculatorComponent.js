

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CalculatorService from './CalculatorService';

const CalculatorComponent = (props) => {
    if (!props.firstNumber || !props.secondNumber || !props.mathOperator) {
        throw new Error('Required props firstNumber, secondNumber, and mathOperator are missing');
    }

    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState('');
    const [decimalFormatString, setDecimalFormatString] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleLockNumberValue = () => {
        CalculatorService.parseInputString(inputValue)
            .then((response) => {
                setInputValue(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleCalculate = () => {
        let calculationResult;
        switch (props.mathOperator) {
            case '+':
                calculationResult = props.firstNumber + props.secondNumber;
                break;
            case '-':
                calculationResult = props.firstNumber - props.secondNumber;
                break;
            case '*':
                calculationResult = props.firstNumber * props.secondNumber;
                break;
            case '/':
                calculationResult = props.firstNumber / props.secondNumber;
                break;
            default:
                throw new Error('Unsupported math operator');
        }

        axios.post('/ToTrimmedString', {
            result: calculationResult,
            decimalFormatString: decimalFormatString,
        })
            .then((response) => {
                setResult(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const getResultText = () => {
        axios.get('/GetResultText')
            .then((response) => {
                setResult(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        getResultText();
    }, []);

    return (
        <div>
            <input type="text" value={inputValue} onChange={handleInputChange} />
            <button onClick={handleLockNumberValue}>Lock Number Value</button>
            <button onClick={handleCalculate}>Calculate</button>
            <p>Result: {result}</p>
        </div>
    );
};

export default CalculatorComponent;