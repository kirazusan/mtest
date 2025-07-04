namespace backend.Extensions
{
    using System;
    using System.Globalization;

    public static class DoubleExtensions
    {
        public static string ToTrimmedString(double value, string format)
        {
            if (string.IsNullOrEmpty(format))
            {
                throw new ArgumentException("Format string cannot be null or empty.", nameof(format));
            }

            try
            {
                string formattedValue = value.ToString(format, CultureInfo.InvariantCulture);
                return formattedValue.TrimEnd('0').TrimEnd('.');
            }
            catch (FormatException)
            {
                throw new ArgumentException("Invalid format string.", nameof(format));
            }
        }
    }
}