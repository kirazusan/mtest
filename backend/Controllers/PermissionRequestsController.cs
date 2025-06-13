

using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Data.SqlClient;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace backend.controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PermissionRequestsController : ControllerBase
    {
        private readonly ILogger<PermissionRequestsController> _logger;
        private readonly IConfiguration _configuration;

        public PermissionRequestsController(ILogger<PermissionRequestsController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult GetPermissionRequests()
        {
            try
            {
                var connectionString = _configuration.GetConnectionString("DefaultConnection");
                using (var connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    var command = new SqlCommand("SELECT * FROM PermissionRequests", connection);
                    var reader = command.ExecuteReader();
                    var permissionRequests = new List<object>();
                    while (reader.Read())
                    {
                        permissionRequests.Add(new
                        {
                            Id = reader["Id"],
                            Requester = reader["Requester"],
                            RequestDate = reader["RequestDate"],
                            Status = reader["Status"]
                        });
                    }
                    reader.Close();
                    return Ok(permissionRequests);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving permission requests data");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}