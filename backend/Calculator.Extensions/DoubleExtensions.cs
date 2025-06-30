

```csharp
using System;
using System.Globalization;

namespace Calculator.Extensions
{
    public static class DoubleExtensions
    {
        public static string ToTrimmedString(this double target, string decimalFormat)
        {
            if (string.IsNullOrEmpty(decimalFormat))
            {
                throw new ArgumentException("decimalFormat cannot be null or empty", nameof(decimalFormat));
            }

            if (double.IsNaN(target) || double.IsInfinity(target))
            {
                return target.ToString();
            }

            try
            {
                string formattedString = target.ToString(decimalFormat, CultureInfo.InvariantCulture);
                return formattedString.TrimEnd('0', '.').TrimStart('0');
            }
            catch (FormatException)
            {
                throw new ArgumentException("Invalid decimal format", nameof(decimalFormat));
            }
        }
    }
}
```