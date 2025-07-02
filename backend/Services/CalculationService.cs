package Services;

using System;

public class CalculationRequest
{
    public double Operand1 { get; set; }
    public double Operand2 { get; set; }
    public string Operation { get; set; }
}

public class CalculationResponse
{
    public double Result { get; set; }
    public string Error { get; set; }
}

public class CalculationService
{
    public CalculationResponse Calculate(CalculationRequest request)
    {
        var response = new CalculationResponse();

        if (request.Operand1 == double.NaN || request.Operand2 == double.NaN)
        {
            response.Error = "Operands must be valid numbers.";
            return response;
        }

        try
        {
            switch (request.Operation)
            {
                case "Add":
                    response.Result = request.Operand1 + request.Operand2;
                    break;
                case "Subtract":
                    response.Result = request.Operand1 - request.Operand2;
                    break;
                case "Multiply":
                    response.Result = request.Operand1 * request.Operand2;
                    break;
                case "Divide":
                    if (request.Operand2 == 0)
                    {
                        response.Error = "Division by zero is not allowed.";
                    }
                    else
                    {
                        response.Result = request.Operand1 / request.Operand2;
                    }
                    break;
                default:
                    response.Error = "Invalid operation.";
                    break;
            }
        }
        catch (Exception ex)
        {
            response.Error = ex.Message;
        }

        return response;
    }
}