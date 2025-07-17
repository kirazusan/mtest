import React, { useEffect, useState } from 'react';
import './CalculatorMainPage.css';
import { MauiAppService } from '../../services/MauiAppService';

const CalculatorMainPage = () => {
  const [initializationMessage, setInitializationMessage] = useState<string | null>(null);
  const [calculationResult, setCalculationResult] = useState<number | null>(null);
  const [availableFonts, setAvailableFonts] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const initializeCalculator = async () => {
    try {
      const message = await MauiAppService.initializeCalculator();
      setInitializationMessage(message);
    } catch (error) {
      setInitializationMessage(error.message || "An error occurred during initialization.");
    }
  };

  const performCalculation = async (input: { operation: string; operands: number[] }) => {
    const validOperations = ['addition', 'subtraction', 'multiplication', 'division', 'negation', 'percentage'];
    if (validOperations.includes(input.operation) && input.operands.every(op => typeof op === 'number')) {
      try {
        const result = await MauiAppService.performCalculation(input);
        setCalculationResult(result);
      } catch (error) {
        setErrorMessage(error.message || "An error occurred during calculation.");
      }
    } else {
      setErrorMessage("Invalid input: Please ensure the operation type is valid and operands are numbers.");
    }
  };

  const getAvailableFonts = async () => {
    try {
      const fonts = await MauiAppService.getAvailableFonts();
      setAvailableFonts(fonts);
    } catch (error) {
      setErrorMessage(error.message || "An error occurred while retrieving fonts.");
    }
  };

  useEffect(() => {
    initializeCalculator();
    getAvailableFonts();
  }, []);

  return (
    <div className="calculator-main-page">
      {initializationMessage && <div className="message">{initializationMessage}</div>}
      {calculationResult !== null && <div className="result">Result: {calculationResult}</div>}
      {errorMessage && <div className="error">{errorMessage}</div>}
      <div className="font-selector">
        <label htmlFor="fonts">Select Font:</label>
        <select id="fonts">
          {availableFonts.map((font, index) => (
            <option key={index} value={font}>{font}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CalculatorMainPage;