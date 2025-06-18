

using System;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;

namespace Data
{
    public class MathOperatorRepository
    {
        private readonly string _connectionString;

        public MathOperatorRepository(string connectionString)
        {
            if (string.IsNullOrEmpty(connectionString))
            {
                throw new ArgumentException("Connection string cannot be null or empty", nameof(connectionString));
            }

            _connectionString = connectionString;
        }

        /// <summary>
        /// Updates the math operator record in the database.
        /// </summary>
        /// <param name="id">The ID of the math operator to update.</param>
        /// <param name="name">The new name of the math operator.</param>
        /// <param name="symbol">The new symbol of the math operator.</param>
        public void UpdateMathOperator(int id, string name, string symbol)
        {
            if (string.IsNullOrEmpty(name))
            {
                throw new ArgumentException("Name cannot be null or empty", nameof(name));
            }

            if (string.IsNullOrEmpty(symbol))
            {
                throw new ArgumentException("Symbol cannot be null or empty", nameof(symbol));
            }

            try
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    connection.Open();

                    var command = new SqlCommand("UPDATE MathOperators SET Name = @Name, Symbol = @Symbol WHERE Id = @Id", connection);
                    command.Parameters.AddWithValue("@Id", id);
                    command.Parameters.AddWithValue("@Name", name);
                    command.Parameters.AddWithValue("@Symbol", symbol);

                    command.ExecuteNonQuery();
                }
            }
            catch (SqlException ex)
            {
                Debug.WriteLine($"Error updating math operator: {ex.Message}");
                throw;
            }
        }
    }
}