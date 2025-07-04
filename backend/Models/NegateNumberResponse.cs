package Models;

public class NegateNumberResponse {
    private double result;
    private String status;

    public NegateNumberResponse(double result, String status) {
        this.result = result;
        this.status = status;
    }

    public double getResult() {
        return result;
    }

    public void setResult(double result) {
        if (result < 0) {
            this.result = result;
            this.status = "Negative result";
        } else {
            this.result = result;
            this.status = "Positive result";
        }
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void negate() {
        this.result = -this.result;
        this.status = "Result negated";
    }
}