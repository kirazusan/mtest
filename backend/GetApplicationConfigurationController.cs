

```csharp
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Microsoft.Data.SqlClient;
using System.Text.Json;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GetApplicationConfigurationController : ControllerBase
    {
        private readonly string _connectionString;

        public GetApplicationConfigurationController(string connectionString)
        {
            if (string.IsNullOrEmpty(connectionString))
            {
                throw new ArgumentException("Connection string cannot be null or empty", nameof(connectionString));
            }

            _connectionString = connectionString;
        }

        [HttpGet]
        public IActionResult GetApplicationConfiguration()
        {
            try
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    connection.Open();

                    var command = new SqlCommand("SELECT * FROM ApplicationConfiguration", connection);
                    var reader = command.ExecuteReader(CommandBehavior.CloseConnection);

                    if (reader.Read())
                    {
                        var applicationConfiguration = new
                        {
                            Id = reader["Id"].ToString(),
                            Property1 = reader["Property1"].ToString(),
                            Property2 = reader["Property2"].ToString(),
                            // Add more properties as needed
                        };

                        return Json(applicationConfiguration);
                    }
                    else
                    {
                        return NotFound("Application configuration not found");
                    }
                }
            }
            catch (SqlException ex)
            {
                return StatusCode(500, "Database error: " + ex.Message);
            }
        }
    }
}
```