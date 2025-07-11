using System;
using System.IO;
using Microsoft.Extensions.Configuration;

namespace backend.Services
{
    public class AppService
    {
        private readonly IConfiguration _configuration;

        public AppService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IConfiguration InitializeApp()
        {
            try
            {
                var builder = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                    .AddEnvironmentVariables();

                var configuration = builder.Build();
                return configuration;
            }
            catch (Exception ex)
            {
                throw new Exception("Error initializing application configuration", ex);
            }
        }
    }
}