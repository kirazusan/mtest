package backend.Services;

using System;

public class CalculatorService
{
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
            throw new DivideByZeroException("Error: Division by zero.");
        }
        return value1 / value2;
    }

    public double Calculate(double value1, double value2, string mathOperator)
    {
        switch (mathOperator)
        {
            case "+":
                return Add(value1, value2);
            case "-":
                return Subtract(value1, value2);
            case "*":
                return Multiply(value1, value2);
            case "/":
                return Divide(value1, value2);
            default:
                throw new ArgumentException("Error: Invalid operator.");
        }
    }

    public double Calculate(CalculationRequest request)
    {
        if (request == null)
        {
            throw new ArgumentNullException(nameof(request), "CalculationRequest cannot be null.");
        }
        return Calculate(request.Value1, request.Value2, request.MathOperator);
    }
}

public class CalculationRequest
{
    public double Value1 { get; set; }
    public double Value2 { get; set; }
    public string MathOperator { get; set; }
}