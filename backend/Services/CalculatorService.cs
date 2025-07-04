package backend.Services;

using System;

public class CalculationRequest
{
    public double Number1 { get; set; }
    public double Number2 { get; set; }
    public string Operation { get; set; }
}

public class CalculationResponse
{
    public double? Result { get; set; }
    public string ErrorMessage { get; set; }
}

public class CalculatorService
{
    public CalculationResponse Calculate(CalculationRequest request)
    {
        var response = new CalculationResponse();
        try
        {
            switch (request.Operation)
            {
                case "add":
                    response.Result = request.Number1 + request.Number2;
                    break;
                case "subtract":
                    response.Result = request.Number1 - request.Number2;
                    break;
                case "multiply":
                    response.Result = request.Number1 * request.Number2;
                    break;
                case "divide":
                    if (request.Number2 == 0)
                    {
                        response.ErrorMessage = "Division by zero is not allowed.";
                    }
                    else
                    {
                        response.Result = request.Number1 / request.Number2;
                    }
                    break;
                default:
                    response.ErrorMessage = "Invalid operation.";
                    break;
            }
        }
        catch (Exception ex)
        {
            response.ErrorMessage = ex.Message;
        }
        return response;
    }

    public CalculationResponse CalculatePercentage(double number, double percentage)
    {
        var response = new CalculationResponse();
        try
        {
            response.Result = (number * percentage) / 100;
        }
        catch (Exception ex)
        {
            response.ErrorMessage = ex.Message;
        }
        return response;
    }

    public CalculationResponse Negate(double number)
    {
        var response = new CalculationResponse();
        try
        {
            response.Result = -number;
        }
        catch (Exception ex)
        {
            response.ErrorMessage = ex.Message;
        }
        return response;
    }
}