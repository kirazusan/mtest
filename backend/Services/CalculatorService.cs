

```csharp
using System;

namespace backend.Services
{
    public class CalculatorService
    {
        private string currentEntry;
        private string result;
        private string decimalFormat;
        private int currentState;
        private readonly string[] validButtons = { "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "+", "-", "*", "/" };

        public CalculatorService()
        {
            currentEntry = "0";
            result = "0";
            decimalFormat = "N2";
            currentState = 0;
        }

        public void UpdateCurrentEntry(string button)
        {
            if (!IsValidButton(button))
            {
                throw new ArgumentException("Invalid button pressed", nameof(button));
            }

            if (result == "0" && button == "0")
            {
                currentEntry = "0";
            }
            else if (currentEntry.Length == 1 && button != "0")
            {
                currentEntry = button;
            }
            else if (currentEntry.Length > 1 && button != "0")
            {
                currentEntry += button;
            }
            else if (currentState < 0)
            {
                currentEntry = "0";
                currentState = 0;
            }
            else if (currentState >= 0)
            {
                currentEntry += button;
            }
            else if (button == ".")
            {
                if (decimalFormat != "N2")
                {
                    decimalFormat = "N2";
                }
                if (!currentEntry.Contains("."))
                {
                    currentEntry += ".";
                }
            }
        }

        public void UpdateResult()
        {
            try
            {
                result = CalculateResult(currentEntry);
            }
            catch (Exception ex)
            {
                throw new Exception("Error calculating result", ex);
            }
        }

        public string GetCurrentEntry()
        {
            return currentEntry;
        }

        public string GetResult()
        {
            return result;
        }

        private bool IsValidButton(string button)
        {
            return Array.IndexOf(validButtons, button) != -1;
        }

        private string CalculateResult(string entry)
        {
            try
            {
                var result = Convert.ToDouble(entry);
                return result.ToString(decimalFormat);
            }
            catch (FormatException)
            {
                throw new ArgumentException("Invalid entry", nameof(entry));
            }
        }
    }
}
```