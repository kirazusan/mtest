package backend.Models;

public class CalculationResponse {
    public double? Result { get; set; }
    public string ErrorMessage { get; set; }
    public bool IsSuccess { get; set; }
    public string ErrorCode { get; set; }

    public CalculationResponse() {
        IsSuccess = true;
    }

    public CalculationResponse(double result) : this() {
        Result = result;
    }

    public CalculationResponse(string errorMessage, string errorCode) {
        ErrorMessage = errorMessage;
        ErrorCode = errorCode;
        IsSuccess = false;
    }
}