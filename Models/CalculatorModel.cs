

using System;

namespace Models
{
    public class CalculatorModel
    {
        public double FirstNumber { get; set; }
        public double SecondNumber { get; set; }
        public string MathOperator { get; set; }
        public int CurrentState { get; set; }
        public string DecimalFormat { get; set; }
        public string CurrentEntry { get; set; }
        public double Result { get; set; }

        public CalculatorModel()
        {
            FirstNumber = 0;
            SecondNumber = 0;
            CurrentState = 1;
            DecimalFormat = "N0";
            CurrentEntry = string.Empty;
        }

        public void SetFirstNumber(double number)
        {
            FirstNumber = number;
        }

        public void SetSecondNumber(double number)
        {
            SecondNumber = number;
        }

        public void SetMathOperator(string operatorValue)
        {
            MathOperator = operatorValue;
        }

        public void SetCurrentState(int state)
        {
            CurrentState = state;
        }

        public void SetDecimalFormat(string format)
        {
            DecimalFormat = format;
        }

        public void SetCurrentEntry(string entry)
        {
            CurrentEntry = entry;
        }

        public void CalculateResult()
        {
            switch (MathOperator)
            {
                case "+":
                    Result = FirstNumber + SecondNumber;
                    break;
                case "-":
                    Result = FirstNumber - SecondNumber;
                    break;
                case "*":
                    Result = FirstNumber * SecondNumber;
                    break;
                case "/":
                    if (SecondNumber != 0)
                    {
                        Result = FirstNumber / SecondNumber;
                    }
                    else
                    {
                        throw new DivideByZeroException("Cannot divide by zero");
                    }
                    break;
                default:
                    throw new ArgumentException("Invalid math operator");
            }
        }

        public void ResetCalculator()
        {
            FirstNumber = 0;
            SecondNumber = 0;
            CurrentState = 1;
            DecimalFormat = "N0";
            CurrentEntry = string.Empty;
            Result = 0;
        }
    }
}