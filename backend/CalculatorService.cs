

```csharp
using System;

namespace backend
{
    public class CalculatorService
    {
        private double currentNumberValue;
        private string mathOperator;
        private int currentState;

        public double PerformCalculation(double currentNumberValue, string mathOperator)
        {
            LockNumberValue(currentNumberValue);
            ValidateMathOperator(mathOperator);
            UpdateCurrentState(mathOperator);
            double result = CalculateResult(currentNumberValue, mathOperator);
            return result;
        }

        private void LockNumberValue(double currentNumberValue)
        {
            this.currentNumberValue = currentNumberValue;
        }

        private void ValidateMathOperator(string mathOperator)
        {
            if (mathOperator != "+" && mathOperator != "-" && mathOperator != "*" && mathOperator != "/")
            {
                throw new ArgumentException("Invalid math operator");
            }
            this.mathOperator = mathOperator;
        }

        private void UpdateCurrentState(string mathOperator)
        {
            switch (mathOperator)
            {
                case "+":
                    currentState = 1;
                    break;
                case "-":
                    currentState = 2;
                    break;
                case "*":
                    currentState = 3;
                    break;
                case "/":
                    currentState = 4;
                    break;
            }
        }

        private double CalculateResult(double currentNumberValue, string mathOperator)
        {
            double result = 0;
            switch (mathOperator)
            {
                case "+":
                    result = currentNumberValue + currentNumberValue;
                    break;
                case "-":
                    result = currentNumberValue - currentNumberValue;
                    break;
                case "*":
                    result = currentNumberValue * currentNumberValue;
                    break;
                case "/":
                    if (currentNumberValue != 0)
                    {
                        result = currentNumberValue / currentNumberValue;
                    }
                    else
                    {
                        throw new DivideByZeroException("Cannot divide by zero");
                    }
                    break;
            }
            return result;
        }
    }
}
```