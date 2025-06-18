

```csharp
using System;

namespace backend.Services
{
    public class UpdateMathOperator
    {
        private string mathOperator;

        public void Update(string newMathOperator)
        {
            if (string.IsNullOrEmpty(newMathOperator))
            {
                throw new ArgumentException("New math operator cannot be null or empty.");
            }

            try
            {
                this.mathOperator = newMathOperator;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to update math operator.", ex);
            }
        }
    }
}
```