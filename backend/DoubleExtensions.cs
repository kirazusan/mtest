package backend;

using System;

public static class DoubleExtensions
{
    public static string ToTrimmedString(this double value, string format)
    {
        try
        {
            string result = value.ToString(format);
            result = result.TrimEnd('0');
            if (result.EndsWith("."))
            {
                result = result.TrimEnd('.');
            }
            return result;
        }
        catch (FormatException)
        {
            throw new ArgumentException("Invalid format string.", nameof(format));
        }
        catch (Exception ex)
        {
            throw new ArgumentException("An error occurred while formatting the double.", ex);
        }
    }
}