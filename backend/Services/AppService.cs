using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace Backend.Services
{
    public class AppService
    {
        private readonly IConfiguration _configuration;

        public AppService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<string> InitializeAsync()
        {
            // Configuration logic
            var settingValue = _configuration["SomeSetting"];
            await Task.Delay(100); // Simulating async operation
            return $"Application Initialized with setting: {settingValue}";
        }
    }
}