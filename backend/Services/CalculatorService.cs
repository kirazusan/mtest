package Services;

using System;

public class CalculatorService
{
    public double Calculate(string value1, string value2, string mathOperator)
    {
        double num1, num2;

        if (!double.TryParse(value1, out num1))
        {
            throw new ArgumentException("Error: Invalid input for value1.");
        }

        if (!double.TryParse(value2, out num2))
        {
            throw new ArgumentException("Error: Invalid input for value2.");
        }

        switch (mathOperator)
        {
            case "+":
                return num1 + num2;
            case "-":
                return num1 - num2;
            case "*":
                return num1 * num2;
            case "/":
                if (num2 == 0)
                {
                    throw new DivideByZeroException("Error: Division by zero.");
                }
                return num1 / num2;
            case "%":
                return (num1 * num2) / 100;
            default:
                throw new ArgumentException("Error: Invalid operator.");
        }
    }
}