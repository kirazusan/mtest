

```csharp
using System;

namespace Services
{
    public class CalculateService
    {
        /// <summary>
        /// Performs a calculation based on the provided operator.
        /// </summary>
        /// <param name="firstNumber">The first number in the calculation.</param>
        /// <param name="secondNumber">The second number in the calculation.</param>
        /// <param name="operator">The operator to use in the calculation.</param>
        /// <returns>The result of the calculation.</returns>
        /// <exception cref="ArgumentException">Thrown if the operator is not one of the four basic arithmetic operators.</exception>
        /// <exception cref="DivideByZeroException">Thrown if the second number is zero and the operator is division.</exception>
        /// <exception cref="FormatException">Thrown if the first or second number is not a valid number.</exception>
        public double Calculate(double firstNumber, double secondNumber, string @operator)
        {
            if (double.IsNaN(firstNumber) || double.IsNaN(secondNumber))
            {
                throw new FormatException("First or second number is not a valid number.");
            }

            if (string.IsNullOrWhiteSpace(@operator))
            {
                throw new ArgumentException("Operator cannot be null or empty.");
            }

            switch (@operator)
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
                        throw new DivideByZeroException("Cannot divide by zero");
                    }
                    return firstNumber / secondNumber;
                default:
                    throw new ArgumentException("Invalid operator");
            }
        }
    }
}
```