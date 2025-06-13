

using System;
using System.Data;
using Microsoft.Data.SqlClient;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using System.Net;

namespace backend.Repositories
{
    public class NotificationChannelRepository
    {
        private readonly string _connectionString;
        private readonly ILogger<NotificationChannelRepository> _logger;

        public NotificationChannelRepository(string connectionString, ILogger<NotificationChannelRepository> logger)
        {
            _connectionString = connectionString;
            _logger = logger;
        }

        public async Task CreateNotificationChannelAsync(string name, string description)
        {
            if (string.IsNullOrEmpty(name) || string.IsNullOrEmpty(description))
            {
                throw new ArgumentException("Name and description are required");
            }

            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                _logger.LogInformation("Creating new notification channel");

                using var command = new SqlCommand("CreateNotificationChannel", connection)
                {
                    CommandType = CommandType.StoredProcedure
                };

                command.Parameters.AddWithValue("@Name", name);
                command.Parameters.AddWithValue("@Description", description);

                await command.ExecuteNonQueryAsync();

                _logger.LogInformation("Notification channel created successfully");
            }
            catch (SqlException ex)
            {
                _logger.LogError(ex, "Error creating notification channel");
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error creating notification channel");
                throw;
            }
        }
    }
}