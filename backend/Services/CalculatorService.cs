package backend.Services;

using System;

public class CalculatorService
{
    public double Calculate(CalculationRequest request)
    {
        return PerformCalculation(request);
    }

    private double PerformCalculation(CalculationRequest request)
    {
        double result = 0;
        switch (request.Operator)
        {
            case "add":
                result = request.Number1 + request.Number2;
                break;
            case "subtract":
                result = request.Number1 - request.Number2;
                break;
            case "multiply":
                result = request.Number1 * request.Number2;
                break;
            case "divide":
                if (request.Number2 == 0)
                {
                    throw new DivideByZeroException("Error: Division by zero.");
                }
                result = request.Number1 / request.Number2;
                break;
            default:
                throw new ArgumentException("Error: Invalid operator.");
        }
        return result;
    }
}

public class CalculationRequest
{
    public double Number1 { get; set; }
    public double Number2 { get; set; }
    public string Operator { get; set; }
}