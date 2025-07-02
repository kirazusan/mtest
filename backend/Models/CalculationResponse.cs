package Models;

public class CalculationResponse {
    private Object result;
    private String error;

    public CalculationResponse(Object result, String error) {
        this.result = result;
        this.error = error;
    }

    public Object getResult() {
        return result;
    }

    public void setResult(Object result) {
        this.result = result;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}