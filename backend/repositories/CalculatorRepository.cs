

using System;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace backend.repositories
{
    public class CalculatorRepository
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<CalculatorRepository> _logger;

        public CalculatorRepository(IConfiguration configuration, ILogger<CalculatorRepository> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public decimal GetCalculatorResult(int num1, int num2, string operation)
        {
            if (num1 < 0 || num2 < 0)
            {
                _logger.LogError("Invalid input parameters");
                throw new ArgumentException("Input parameters must be non-negative");
            }

            if (string.IsNullOrEmpty(operation))
            {
                _logger.LogError("Invalid operation");
                throw new ArgumentException("Operation must not be empty");
            }

            string connectionString = _configuration.GetConnectionString("DefaultConnection");
            string query = "SELECT result FROM CalculatorResults WHERE num1 = @num1 AND num2 = @num2 AND operation = @operation";

            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@num1", num1);
                        command.Parameters.AddWithValue("@num2", num2);
                        command.Parameters.AddWithValue("@operation", operation);

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                return reader.GetDecimal(0);
                            }
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                _logger.LogError(ex, "Database connection failed or timed out");
                throw;
            }

            _logger.LogInformation("No result found in database");
            throw new Exception("No result found in database");
        }
    }
}