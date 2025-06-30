

```csharp
using System;

namespace Services
{
    public class CalculatorService
    {
        private CalculatorModel _calculatorModel;
        private CalculatorState _calculatorState;

        public CalculatorService(CalculatorModel calculatorModel, CalculatorState calculatorState)
        {
            _calculatorModel = calculatorModel;
            _calculatorState = calculatorState;
        }

        public double Calculate(double firstNumber, double secondNumber, string operatorValue)
        {
            if (secondNumber == 0)
            {
                LockNumberValue(firstNumber, operatorValue);
            }

            if (operatorValue != "+" && operatorValue != "-" && operatorValue != "*" && operatorValue != "/")
            {
                throw new ArgumentException("Invalid operator");
            }

            var calculator = new Calculator();
            var result = calculator.Calculate(firstNumber, secondNumber, operatorValue);

            return result;
        }

        public double LockNumberValue(double number, string operatorValue)
        {
            var calculator = new Calculator();
            var result = calculator.LockNumberValue(number, operatorValue);

            return result;
        }

        public void ResetCalculatorState()
        {
            _calculatorState.ResetState();
        }
    }

    public class CalculatorModel
    {
        public double FirstNumber { get; set; }
        public double SecondNumber { get; set; }
        public string Operator { get; set; }
    }

    public class CalculatorState
    {
        public void ResetState()
        {
            // Implement logic to reset calculator state
            // For example:
            // _calculatorModel.FirstNumber = 0;
            // _calculatorModel.SecondNumber = 0;
            // _calculatorModel.Operator = "";
        }
    }

    public class Calculator
    {
        public double Calculate(double firstNumber, double secondNumber, string operatorValue)
        {
            switch (operatorValue)
            {
                case "+":
                    return firstNumber + secondNumber;
                case "-":
                    return firstNumber - secondNumber;
                case "*":
                    return firstNumber * secondNumber;
                case "/":
                    if (secondNumber == 0)
                    {
                        throw new DivideByZeroException();
                    }
                    return firstNumber / secondNumber;
                default:
                    throw new ArgumentException("Invalid operator");
            }
        }

        public double LockNumberValue(double number, string operatorValue)
        {
            // Implement lock number value logic
            // For example:
            // return number * 2;
        }
    }
}
```