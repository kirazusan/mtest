

```csharp
using System;

namespace Models
{
    public class CalculatorState
    {
        public double FirstNumber { get; set; }
        public double SecondNumber { get; set; }
        public string CurrentState { get; set; }
        public string DecimalFormat { get; set; }
        public string CurrentEntry { get; set; }

        public CalculatorState()
        {
            FirstNumber = 0;
            SecondNumber = 0;
            CurrentState = "initial";
            DecimalFormat = "0.00";
            CurrentEntry = "";
        }
    }
}
```