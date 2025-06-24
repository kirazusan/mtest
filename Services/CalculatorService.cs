

```csharp
using System;
using System.Data.SqlClient;

namespace Services
{
    public class CalculatorService
    {
        private string connectionString;
        private decimal firstNumber;
        private decimal secondNumber;
        private string currentState;
        private string decimalFormat;

        public CalculatorService(string connectionString)
        {
            this.connectionString = connectionString;
            ResetCalculatorState();
        }

        public decimal Calculate(decimal currentEntry, string resultText)
        {
            decimal result = 0;

            switch (currentState)
            {
                case "initial":
                    firstNumber = currentEntry;
                    currentState = "firstNumberSet";
                    break;
                case "firstNumberSet":
                    secondNumber = currentEntry;
                    currentState = "secondNumberSet";
                    break;
                case "secondNumberSet":
                    switch (resultText)
                    {
                        case "+":
                            result = firstNumber + secondNumber;
                            break;
                        case "-":
                            result = firstNumber - secondNumber;
                            break;
                        case "*":
                            result = firstNumber * secondNumber;
                            break;
                        case "/":
                            if (secondNumber != 0)
                            {
                                result = firstNumber / secondNumber;
                            }
                            else
                            {
                                throw new DivideByZeroException("Cannot divide by zero");
                            }
                            break;
                    }
                    ResetCalculatorState();
                    break;
            }

            return result;
        }

        public void LockNumberValue()
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand("sp_LockNumberValue", connection);
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.ExecuteNonQuery();
                }
            }
            catch (SqlException ex)
            {
                throw new Exception("Error locking number value: " + ex.Message);
            }
        }

        public CalculatorState ResetCalculatorState()
        {
            firstNumber = 0;
            secondNumber = 0;
            currentState = "initial";
            decimalFormat = "0.00";

            return new CalculatorState
            {
                FirstNumber = firstNumber,
                SecondNumber = secondNumber,
                CurrentState = currentState,
                DecimalFormat = decimalFormat
            };
        }
    }

    public class CalculatorState
    {
        public decimal FirstNumber { get; set; }
        public decimal SecondNumber { get; set; }
        public string CurrentState { get; set; }
        public string DecimalFormat { get; set; }
    }
}
```