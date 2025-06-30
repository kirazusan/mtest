

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.IO;

namespace Repositories
{
    public class ApplicationStateRepository
    {
        private Dictionary<string, object> applicationState = new Dictionary<string, object>();
        private readonly string _filePath;
        private readonly ILogger _logger;

        public ApplicationStateRepository(string filePath, ILogger<ApplicationStateRepository> logger)
        {
            _filePath = filePath;
            _logger = logger;
            LoadApplicationState();
        }

        public object GetApplicationState(string key)
        {
            if (string.IsNullOrEmpty(key))
            {
                throw new ArgumentException("Key cannot be null or empty", nameof(key));
            }

            try
            {
                return applicationState[key];
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving application state for key {key}", key);
                throw;
            }
        }

        public void UpdateApplicationState(string key, object value)
        {
            if (string.IsNullOrEmpty(key))
            {
                throw new ArgumentException("Key cannot be null or empty", nameof(key));
            }

            try
            {
                if (applicationState.ContainsKey(key))
                {
                    applicationState[key] = value;
                }
                else
                {
                    applicationState.Add(key, value);
                }
                SaveApplicationState();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while updating application state for key {key}", key);
                throw;
            }
        }

        public void DeleteApplicationState(string key)
        {
            if (string.IsNullOrEmpty(key))
            {
                throw new ArgumentException("Key cannot be null or empty", nameof(key));
            }

            try
            {
                if (applicationState.ContainsKey(key))
                {
                    applicationState.Remove(key);
                    SaveApplicationState();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while deleting application state for key {key}", key);
                throw;
            }
        }

        private void LoadApplicationState()
        {
            try
            {
                if (File.Exists(_filePath).Exists)
                {
                    var json = File.ReadAllText(_filePath);
                    applicationState = JsonConvert.DeserializeObject<Dictionary<string, object>>(json);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while loading application state");
                throw;
            }
        }

        private void SaveApplicationState()
        {
            try
            {
                var json = JsonConvert.SerializeObject(applicationState, Formatting.Indented);
                File.WriteAllText(_filePath, json);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while saving application state");
                throw;
            }
        }
    }
}
```