

```csharp
using Microsoft.AspNetCore.Mvc;
using System;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CalculationsController : ControllerBase
    {
        private string currentCalculation = "";
        private string resultText = "";

        [HttpGet]
        public string GetCurrentCalculation()
        {
            // Implement logic to get current calculation based on existing business logic from C# MAUI project
            // For demonstration purposes, a simple calculation is performed
            int num1 = 10;
            int num2 = 5;
            int calculation = num1 + num2;
            currentCalculation = $"Current calculation: {num1} + num2}";
            return currentCalculation;
        }

        [HttpGet]
        public string GetResultText()
        {
            try
            {
                // Implement calculation logic using existing business logic from C# MAUI project
                // For demonstration purposes, a simple calculation is performed
                int num1 = 10;
                int num2 = 5;
                int result = num1 + num2;
                resultText = $"The result of the calculation is: {result}";
                return resultText;
            }
            catch (Exception ex)
            {
                return $"An error occurred during the calculation: {ex.Message}";
            }
        }
    }
}
```