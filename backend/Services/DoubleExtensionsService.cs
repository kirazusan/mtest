

```csharp
using System;

namespace backend.Services
{
    public class DoubleExtensionsService
    {
        public string ToTrimmedString(double target, string decimalFormat)
        {
            var formattedString = target.ToString(decimalFormat);
            var trimmedString = formattedString.TrimEnd('0');
            if (trimmedString.EndsWith("."))
            {
                trimmedString = trimmedString.Replace(".", string.Empty);
            }
            return trimmedString;
        }
    }
}
```