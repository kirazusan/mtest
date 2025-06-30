

using System;
using System.Collections.Generic;

namespace backend.CalculatorService
{
    public class UtilityClass
    {
        private Dictionary<string, string> buttonTextValues = new Dictionary<string, string>()
        {
            {"button1", "Button 1 Text"},
            {"button2", "Button 2 Text"},
            // Add more button text values as needed
        };

        public string GetButtonText(string buttonIdOrName)
        {
            if (buttonIdOrName == null)
            {
                throw new ArgumentNullException(nameof(buttonIdOrName));
            }

            return buttonTextValues.TryGetValue(buttonIdOrName, out string textValue) ? textValue : string.Empty;
        }

        public string ToTrimmedString(double value, string formatString)
        {
            if (double.IsNaN(value) || double.IsInfinity(value))
            {
                throw new ArgumentException("Value cannot be NaN or infinity", nameof(value));
            }

            if (string.IsNullOrEmpty(formatString))
            {
                throw new ArgumentException("Format string cannot be null or empty", nameof(formatString));
            }

            string formattedString = string.Format(formatString, value);
            return formattedString.TrimEnd('0').TrimEnd('.');
        }
    }
}