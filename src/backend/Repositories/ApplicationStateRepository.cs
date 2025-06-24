

using System;
using System.Data;
using System.Data.SqlClient;

namespace src.backend.Repositories
{
    public class ApplicationStateRepository
    {
        private readonly string _connectionString;

        public ApplicationStateRepository(string connectionString)
        {
            if (string.IsNullOrEmpty(connectionString))
            {
                throw new ArgumentException("Connection string cannot be null or empty", nameof(connectionString));
            }

            _connectionString = connectionString;
        }

        public ApplicationState GetApplicationState()
        {
            try
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    connection.Open();
                    var command = new SqlCommand("SELECT * FROM ApplicationState", connection);
                    var reader = command.ExecuteReader();
                    if (reader.Read())
                    {
                        return new ApplicationState
                        {
                            Id = reader.GetInt32(0),
                            State = reader.GetString(1)
                        };
                    }
                    else
                    {
                        throw new InvalidOperationException("Application state not found");
                    }
                }
            }
            catch (SqlException ex)
            {
                throw new InvalidOperationException("Failed to retrieve application state", ex);
            }
        }

        public void UpdateApplicationState(ApplicationState applicationState)
        {
            if (applicationState == null)
            {
                throw new ArgumentNullException(nameof(applicationState));
            }

            try
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    connection.Open();
                    var command = new SqlCommand("UPDATE ApplicationState SET State = @State", connection);
                    command.Parameters.AddWithValue("@State", applicationState.State);
                    command.ExecuteNonQuery();
                }
            }
            catch (SqlException ex)
            {
                throw new InvalidOperationException("Failed to update application state", ex);
            }
        }
    }

    public class ApplicationState
    {
        public int Id { get; set; }
        public string State { get; set; }
    }
}