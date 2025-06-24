

```csharp
using System;

namespace Services
{
    public class ConvertDoubleToTrimmedStringService
    {
        /// <summary>
        /// Converts a double value to a trimmed string using the provided decimal format.
        /// </summary>
        /// <param name="value">The double value to convert.</param>
        /// <param name="format">The decimal format string.</param>
        /// <returns>The trimmed string representation of the double value.</returns>
        public string ConvertDoubleToTrimmedString(double? value, string format)
        {
            if (value == null)
            {
                throw new ArgumentNullException(nameof(value), "Input value cannot be null.");
            }

            if (string.IsNullOrEmpty(format))
            {
                throw new ArgumentException("Input format string cannot be null or empty.", nameof(format));
            }

            try
            {
                string formattedString = string.Format(format, value);
                return formattedString.TrimEnd('0', '.');
            }
            catch (FormatException ex)
            {
                throw new FormatException($"Invalid format string: {format}.", ex);
            }
            catch (Exception ex)
            {
                // Log the exception
                throw;
            }
        }
    }
}
```