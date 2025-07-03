package backend.Extensions;

using System;
using System.Globalization;

public static class DoubleExtensions
{
    public static string ToTrimmedString(this double value, string format)
    {
        if (string.IsNullOrEmpty(format))
        {
            throw new ArgumentException("Format string cannot be null or empty.", nameof(format));
        }

        string result = value.ToString(format, CultureInfo.InvariantCulture);
        return result.TrimEnd('0').TrimEnd('.');
    }
}