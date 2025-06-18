

```csharp
using System;

namespace Services
{
    public class NumberParsingService
    {
        public double? ParseNumber(string input)
        {
            if (input == null)
            {
                throw new ArgumentNullException(nameof(input));
            }

            double number;
            if (double.TryParse(input, out number))
            {
                return number;
            }
            else
            {
                return null;
            }
        }
    }

    public class ErrorMessageService
    {
        public string GetErrorMessage()
        {
            return "Error: Unable to parse input string into a numerical value.";
        }
    }
}
```