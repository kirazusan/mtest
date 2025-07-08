package backend.Services;

using System;

public class CalculationRequest
{
    public double Value1 { get; set; }
    public double Value2 { get; set; }
    public string Operation { get; set; }
}

public class CalculationResponse
{
    public double? Result { get; set; }
    public string ErrorMessage { get; set; }
}

public class CalculatorRequest
{
    public string InitialState { get; set; }
}

public class CalculatorResponse
{
    public string CurrentState { get; set; }
}

public class CalculatorService
{
    private string calculatorState;

    public CalculationResponse PerformCalculation(CalculationRequest request)
    {
        if (request == null || string.IsNullOrEmpty(request.Operation))
        {
            return new CalculationResponse { ErrorMessage = "Operation is required." };
        }

        switch (request.Operation.ToLower())
        {
            case "add":
                return new CalculationResponse { Result = request.Value1 + request.Value2 };
            case "subtract":
                return new CalculationResponse { Result = request.Value1 - request.Value2 };
            case "multiply":
                return new CalculationResponse { Result = request.Value1 * request.Value2 };
            case "divide":
                if (request.Value2 == 0)
                {
                    return new CalculationResponse { ErrorMessage = "Division by zero is not allowed." };
                }
                return new CalculationResponse { Result = request.Value1 / request.Value2 };
            default:
                return new CalculationResponse { ErrorMessage = "Invalid operation." };
        }
    }

    public double Calculate(double value1, double value2, string mathOperator)
    {
        switch (mathOperator.ToLower())
        {
            case "add":
                return value1 + value2;
            case "subtract":
                return value1 - value2;
            case "multiply":
                return value1 * value2;
            case "divide":
                if (value2 == 0)
                {
                    throw new DivideByZeroException("Division by zero is not allowed.");
                }
                return value1 / value2;
            default:
                throw new InvalidOperationException("Invalid operator.");
        }
    }

    public CalculatorResponse InitializeCalculator(CalculatorRequest request)
    {
        if (request == null)
        {
            throw new ArgumentNullException(nameof(request));
        }
        calculatorState = request.InitialState ?? "Default State";
        return new CalculatorResponse { CurrentState = calculatorState };
    }

    public void ResetCalculator()
    {
        calculatorState = "Default State";
    }
}