package Extensions;

using System;

public static class DoubleExtensions
{
    public static string ToTrimmedString(this double target, string decimalFormat)
    {
        if (double.IsNaN(target) || double.IsInfinity(target))
        {
            throw new ArgumentException("The double value cannot be NaN or Infinity.", nameof(target));
        }

        try
        {
            string result = target.ToString(decimalFormat);
            if (result.Contains("."))
            {
                result = result.TrimEnd('0');
                if (result.EndsWith("."))
                {
                    result = result.TrimEnd('.');
                }
            }
            return result;
        }
        catch (FormatException)
        {
            throw new ArgumentException("Invalid format string.", nameof(decimalFormat));
        }
    }
}