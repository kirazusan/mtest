

```csharp
using System;

namespace backend.Services
{
    public class CalculatorService
    {
        private string decimalFormatString;

        public CalculatorService(string decimalFormatString)
        {
            if (string.IsNullOrEmpty(decimalFormatString))
            {
                throw new ArgumentException("Decimal format string cannot be null or empty");
            }
            this.decimalFormatString = decimalFormatString;
        }

        public double Calculate(double num1, double num2, string operation)
        {
            if (string.IsNullOrEmpty(operation))
            {
                throw new ArgumentException("Operation cannot be null or empty");
            }
            switch (operation)
            {
                case "+":
                    return num1 + num2;
                case "-":
                    return num1 - num2;
                case "*":
                    return num1 * num2;
                case "/":
                    if (num2 != 0)
                        return num1 / num2;
                    else
                        throw new DivideByZeroException();
                case "%":
                    if (num2 != 0)
                    return num1 % num2;
                case "^":
                    return Math.Pow(num1, num2);
                default:
                    throw new ArgumentException("Invalid operation");
            }
        }

        public string GetDecimalFormat()
        {
            return decimalFormatString;
        }

        public string ToTrimmedString(double result)
        {
            return result.ToString(decimalFormatString).TrimEnd('0').TrimEnd('.');
        }
    }
}
```