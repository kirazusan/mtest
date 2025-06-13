

using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace backend.Services
{
    public class NotificationChannelService
    {
        private readonly ILogger<NotificationChannelService> _logger;
        private readonly NotificationChannelSettings _settings;
        private readonly HttpClient _httpClient;

        public NotificationChannelService(ILogger<NotificationChannelService> logger, IOptions<NotificationChannelSettings> settings, HttpClient httpClient)
        {
            _logger = logger;
            _settings = settings.Value;
            _httpClient = httpClient;
        }

        public async Task CreateNotificationChannelAsync(NotificationChannel channel)
        {
            try
            {
                var json = JsonConvert.SerializeObject(channel);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _settings.ApiKey);

                var response = await _httpClient.PostAsync(_settings.ApiUrl, content);

                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogError($"Error creating notification channel: {response.StatusCode}");
                    throw new Exception($"Error creating notification channel: {response.StatusCode}");
                }

                _logger.LogInformation($"Notification channel created: {json}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating notification channel");
                throw;
            }
        }
    }

    public class NotificationChannelSettings
    {
        public string ApiUrl { get; set; }
        public string ApiKey { get; set; }
    }

    public class NotificationChannel
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public string Endpoint { get; set; }
    }
}