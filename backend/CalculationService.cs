

```csharp
using System;

namespace backend
{
    public class CalculationService
    {
        private readonly ILogger _logger;

        public CalculationService(ILogger logger)
        {
            _logger = logger;
        }

        public void ResetCalculationState(ref double firstNumber, ref double secondNumber, ref int currentState, ref string decimalFormat, ref string currentEntry)
        {
            try
            {
                ValidateInputParameters(ref firstNumber, ref secondNumber, ref currentState, ref decimalFormat, ref currentEntry);

                ResetFirstNumber(ref firstNumber);
                ResetSecondNumber(ref secondNumber);
                ResetCurrentState(ref currentState);
                ResetDecimalFormat(ref decimalFormat);
                ResetCurrentEntry(ref currentEntry);

                _logger.Log("Calculation state has been reset successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError("An error occurred while resetting the calculation state.", ex);
                throw;
            }
        }

        private void ValidateInputParameters(ref double firstNumber, ref double secondNumber, ref int currentState, ref string decimalFormat, ref string currentEntry)
        {
            if (double.IsNaN(firstNumber) || double.IsInfinity(firstNumber))
            {
                throw new ArgumentException("Invalid first number.", nameof(firstNumber));
            }

            if (double.IsNaN(secondNumber) || double.IsInfinity(secondNumber))
            {
                throw new ArgumentException("Invalid second number.", nameof(secondNumber));
            }

            if (currentState < 1)
            {
                throw new ArgumentException("Invalid current state.", nameof(currentState));
            }

            if (string.IsNullOrEmpty(decimalFormat))
            {
                throw new ArgumentException("Invalid decimal format.", nameof(decimalFormat));
            }

            if (string.IsNullOrEmpty(currentEntry))
            {
                throw new ArgumentException("Invalid current entry.", nameof(currentEntry));
            }
        }

        private void ResetFirstNumber(ref double firstNumber)
        {
            firstNumber = 0;
        }

        private void ResetSecondNumber(ref double secondNumber)
        {
            secondNumber = 0;
        }

        private void ResetCurrentState(ref int currentState)
        {
            currentState = 1;
        }

        private void ResetDecimalFormat(ref string decimalFormat)
        {
            if (decimalFormat != "N0")
            {
                decimalFormat = "N0";
            }
        }

        private void ResetCurrentEntry(ref string currentEntry)
        {
            currentEntry = string.Empty;
        }
    }
}
```