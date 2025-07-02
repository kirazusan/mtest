package Extensions;

using System;
using System.Globalization;

public static class DoubleExtensions
{
    public static string ToTrimmedString(this double value, string format)
    {
        if (string.IsNullOrEmpty(format))
        {
            throw new ArgumentException("Format cannot be null or empty.", nameof(format));
        }

        if (double.IsNaN(value) || double.IsInfinity(value))
        {
            return value.ToString(CultureInfo.InvariantCulture);
        }

        string formattedValue = value.ToString(format, CultureInfo.InvariantCulture);
        if (formattedValue.Contains("."))
        {
            formattedValue = formattedValue.TrimEnd('0').TrimEnd('.');
        }
        return formattedValue;
    }
}