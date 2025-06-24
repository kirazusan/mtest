

```csharp
using System;
using System.Globalization;

public static class DoubleExtensions
{
    public static string ToTrimmedString(this double target, string decimalFormat)
    {
        if (double.IsNaN(target) || double.IsInfinity(target))
        {
            throw new ArgumentOutOfRangeException(nameof(target), "The target value cannot be NaN or infinity.");
        }

        if (string.IsNullOrWhiteSpace(decimalFormat))
        {
            throw new ArgumentException("The decimal format cannot be null or empty.", nameof(decimalFormat));
        }

        if (!double.TryParse(target.ToString(CultureInfo.InvariantCulture), out _))
        {
            throw new ArgumentException("Invalid target value.", nameof(target));
        }

        try
        {
            var formattedString = target.ToString(decimalFormat, CultureInfo.InvariantCulture);
            var trimmedString = formattedString.TrimEnd('0');
            return trimmedString.EndsWith(".") ? trimmedString.Replace(".", string.Empty) : trimmedString;
        }
        catch (FormatException ex)
        {
            throw new ArgumentException("Invalid decimal format.", nameof(decimalFormat), ex);
        }
    }
}
```