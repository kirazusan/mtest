```csharp
using System;

namespace CalculatorApp
{
    public class Calculator
    {
        public double Calculate(double value1, double value2, string mathOperator)
        {
            if (mathOperator == "÷" && value2 == 0)
            {
                throw new DivideByZeroException("Division by zero is not allowed.");
            }
            double result = 0;
            switch (mathOperator)
            {
                case "÷":
                    result = value1 / value2;
                    break;
                case "×":
                    result = value1 * value2;
                    break;
                case "+":
                    result = value1 + value2;
                    break;
                case "-":
                    result = value1 - value2;
                    break;
                default:
                    result = 0;
                    break;
            }
            return result;
        }

        public double Add(double value1, double value2)
        {
            return value1 + value2;
        }

        public double Subtract(double value1, double value2)
        {
            return value1 - value2;
        }

        public double Multiply(double value1, double value2)
        {
            return value1 * value2;
        }

        public double Divide(double value1, double value2)
        {
            if (value2 == 0)
            {
                throw new DivideByZeroException("Division by zero is not allowed.");
            }
            return value1 / value2;
        }
    }
}
```