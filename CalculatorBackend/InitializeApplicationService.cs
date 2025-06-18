

```csharp
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Data.SqlClient;
using System.IO;

namespace CalculatorBackend
{
    public class InitializeApplicationService
    {
        private readonly ILogger _logger;
        private readonly IConfiguration _configuration;
        private readonly AppSettings _appSettings;

        public InitializeApplicationService(ILogger<InitializeApplicationService> logger, IConfiguration configuration, IOptions<AppSettings> appSettings)
        {
            _logger = logger;
            _configuration = configuration;
            _appSettings = appSettings.Value;
        }

        public bool InitializeApplication(string[] args)
        {
            try
            {
                // Load configuration from appsettings.json
                _logger.LogInformation("Loading configuration from appsettings.json");

                // Initialize database connection
                var connectionString = _appSettings.DatabaseConnectionString;
                using (var connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    _logger.LogInformation("Database connection established.");
                }

                // Initialize database logic
                _logger.LogInformation("Initializing database logic.");
                using (var connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    var command = new SqlCommand("CREATE TABLE IF NOT EXISTS CalculatorHistory (Id INT PRIMARY KEY, Calculation VARCHAR(255), Result VARCHAR(255))", connection);
                    command.ExecuteNonQuery();
                    _logger.LogInformation("Database logic initialized.");
                }

                // Initialize application services
                _logger.LogInformation("Initializing application services.");
                // Initialize services logic here
                _logger.LogInformation("Application services initialized.");

                _logger.LogInformation("Application initialized successfully.");
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error initializing application.");
                return false;
            }
        }
    }

    public class AppSettings
    {
        public string DatabaseConnectionString { get; set; }
    }
}
```