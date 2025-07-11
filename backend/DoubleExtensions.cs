using System;

namespace Backend
{
    public static class DoubleExtensions
    {
        public static string ToTrimmedString(double value, string format)
        {
            string formattedValue = value.ToString(format);
            if (formattedValue.Contains("."))
            {
                formattedValue = formattedValue.TrimEnd('0').TrimEnd('.');
            }
            return formattedValue;
        }
    }
}