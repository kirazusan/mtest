package Services;

using System;

public class ValidationResult
{
    public bool IsValid { get; set; }
    public string ErrorMessage { get; set; }
}

public class CalculationResponse
{
    public double? Result { get; set; }
    public string ErrorMessage { get; set; }
}

public class CalculatorService
{
    public CalculationResponse Calculate(double? value1, double? value2, string mathOperator)
    {
        var validationResult = ValidateInput(value1, value2, mathOperator);
        if (!validationResult.IsValid)
        {
            return new CalculationResponse { ErrorMessage = validationResult.ErrorMessage };
        }

        try
        {
            double? result = null;
            switch (mathOperator)
            {
                case "+":
                    result = value1.Value + value2.Value;
                    break;
                case "-":
                    result = value1.Value - value2.Value;
                    break;
                case "*":
                    result = value1.Value * value2.Value;
                    break;
                case "/":
                    if (value2.Value == 0)
                    {
                        return new CalculationResponse { ErrorMessage = "Error: Division by zero." };
                    }
                    result = value1.Value / value2.Value;
                    break;
            }
            return new CalculationResponse { Result = result };
        }
        catch (Exception ex)
        {
            return new CalculationResponse { ErrorMessage = $"Error: {ex.Message}" };
        }
    }

    private ValidationResult ValidateInput(double? value1, double? value2, string mathOperator)
    {
        var result = new ValidationResult { IsValid = true };

        if (value1 == null || value2 == null)
        {
            result.IsValid = false;
            result.ErrorMessage = "Error: Input values cannot be null.";
        }
        else if (string.IsNullOrEmpty(mathOperator) || !IsValidOperator(mathOperator))
        {
            result.IsValid = false;
            result.ErrorMessage = "Error: Invalid math operator.";
        }

        return result;
    }

    private bool IsValidOperator(string mathOperator)
    {
        return mathOperator == "+" || mathOperator == "-" || mathOperator == "*" || mathOperator == "/";
    }
}