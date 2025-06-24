

```csharp
using System;
using System.Data.SqlClient;
using System.Text.RegularExpressions;

namespace BusinessLogic
{
    public class CalculatorLogic
    {
        private readonly string connectionString;
        private readonly CalculatorStateRepository calculatorStateRepository;
        private readonly Logger logger;

        public CalculatorLogic(string connectionString, CalculatorStateRepository calculatorStateRepository, Logger logger)
        {
            this.connectionString = connectionString;
            this.calculatorStateRepository = calculatorStateRepository;
            this.logger = logger;
        }

        public string UpdateResultText(string buttonText)
        {
            if (string.IsNullOrEmpty(buttonText))
            {
                throw new ArgumentException("Button text cannot be null or empty", nameof(buttonText));
            }

            string resultText = "";

            if (buttonText == "=")
            {
                resultText = CalculateResult();
            }
            else
            {
                resultText = UpdateCalculatorState(buttonText);
            }

            return resultText;
        }

        private string CalculateResult()
        {
            string result = "";

            try
            {
                string expression = calculatorStateRepository.GetExpression();

                result = EvaluateExpression(expression);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error calculating result");
            }

            return result;
        }

        private string UpdateCalculatorState(string buttonText)
        {
            string currentState = calculatorStateRepository.GetExpression();

            string updatedState = currentState + buttonText;

            try
            {
                calculatorStateRepository.UpdateExpression(updatedState);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error updating calculator state");
            }

            return updatedState;
        }

        private string EvaluateExpression(string expression)
        {
            try
            {
                DataTable table = new DataTable();
                var result = table.Compute(expression, String.Empty);
                return result.ToString();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error evaluating expression");
                return "Error";
            }
        }
    }

    public interface CalculatorStateRepository
    {
        string GetExpression();
        void UpdateExpression(string expression);
    }

    public class CalculatorStateRepositorySql : CalculatorStateRepository
    {
        private readonly string connectionString;

        public CalculatorStateRepositorySql(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public string GetExpression()
        {
            string expression = "";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                string query = "SELECT expression FROM CalculatorState";
                SqlCommand command = new SqlCommand(query, connection);
                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    expression = reader["expression"].ToString();
                }
            }

            return expression;
        }

        public void UpdateExpression(string expression)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                string query = "UPDATE CalculatorState SET expression = @expression";
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@expression", expression);
                command.ExecuteNonQuery();
            }
        }
    }

    public interface Logger
    {
        void LogError(Exception ex, string message);
    }

    public class LoggerConsole : Logger
    {
        public void LogError(Exception ex, string message)
        {
            Console.WriteLine($"Error: {message} - {ex.Message}");
        }
    }
}
```