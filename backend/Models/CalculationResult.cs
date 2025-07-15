package Models;

public class CalculationResult {
    public double? Result { get; set; }
    public string? ErrorMessage { get; set; }

    public CalculationResult(double? result = null, string? errorMessage = null) {
        Result = result;
        ErrorMessage = errorMessage;
    }
}