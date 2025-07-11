package Services;

public class CalculatorService {
    public double Add(double a, double b) {
        return a + b;
    }

    public double Subtract(double a, double b) {
        return a - b;
    }

    public double Multiply(double a, double b) {
        return a * b;
    }

    public double Divide(double a, double b) {
        if (b == 0) {
            throw new IllegalArgumentException("Division by zero is not allowed.");
        }
        return a / b;
    }
}