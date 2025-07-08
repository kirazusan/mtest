package backend.Models;

public class CalculatorState {
    public double CurrentValue { get; set; }
    public string LastOperation { get; set; }
    public double MemoryValue { get; set; }
    public bool IsError { get; set; }
    public string ErrorMessage { get; set; }

    public CalculatorState() {
        CurrentValue = 0.0;
        LastOperation = string.Empty;
        MemoryValue = 0.0;
        IsError = false;
        ErrorMessage = string.Empty;
    }
}