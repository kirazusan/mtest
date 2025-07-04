package backend.Models;

public class PercentageResponse {
    public decimal Result { get; set; }
    public string ErrorMessage { get; set; }

    public PercentageResponse(decimal result, string errorMessage) {
        Result = result;
        ErrorMessage = errorMessage;
    }

    public PercentageResponse() {
        Result = 0;
        ErrorMessage = string.Empty;
    }
}