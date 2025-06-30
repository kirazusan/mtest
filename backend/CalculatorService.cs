

```csharp
using System;

public class CalculatorService
{
    private string currentState;
    private string mathOperator;
    private object lockObject = new object();

    public (string, string) OnSelectOperator(string operatorValue)
    {
        if (string.IsNullOrEmpty(operatorValue))
        {
            throw new ArgumentException("Operator cannot be null or empty", nameof(operatorValue));
        }

        try
        {
            lock (lockObject)
            {
                if (!string.IsNullOrEmpty(currentState))
                {
                    currentState = LockNumberValue(currentState);
                }
                mathOperator = operatorValue;
                return (currentState, mathOperator);
            }
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("Failed to update current state and math operator", ex);
        }
    }

    private string LockNumberValue(string currentValue)
    {
        // Perform some action to lock the current number value
        // For demonstration purposes, this method simply returns the current value
        return currentValue;
    }
}
```