package CalculatorApi.Services;

using System;

public class CalculatorService
{
    public double Calculate(double value1, double value2, string mathOperator)
    {
        double result = 0;

        switch (mathOperator)
        {
            case "+":
                result = Add(value1, value2);
                break;
            case "-":
                result = Subtract(value1, value2);
                break;
            case "*":
                result = Multiply(value1, value2);
                break;
            case "/":
                if (value2 == 0)
                {
                    throw new DivideByZeroException("Division by zero is not allowed.");
                }
                result = Divide(value1, value2);
                break;
            case "%":
                result = Percentage(value1, value2);
                break;
            default:
                throw new InvalidOperationException("Invalid operator.");
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
        return value1 / value2;
    }

    public double Percentage(double value1, double value2)
    {
        return (value1 * value2) / 100;
    }
}