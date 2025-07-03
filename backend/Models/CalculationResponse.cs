package Models;

public class CalculationResponse {
    private double result;
    private String errorMessage;

    public CalculationResponse() {
        this.result = 0;
        this.errorMessage = null;
    }

    public CalculationResponse(double result) {
        this.result = result;
        this.errorMessage = null;
    }

    public CalculationResponse(String errorMessage) {
        this.result = 0;
        this.errorMessage = errorMessage;
    }

    public double getResult() {
        return result;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setResult(double result) {
        this.result = result;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}