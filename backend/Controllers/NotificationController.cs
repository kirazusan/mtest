

using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using System;

namespace backend.controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationRepository _notificationRepository;
        private readonly ILogger<NotificationController> _logger;
        private readonly IMemoryCache _cache;

        public NotificationController(INotificationRepository notificationRepository, ILogger<NotificationController> logger, IMemoryCache cache)
        {
            _notificationRepository = notificationRepository ?? throw new ArgumentNullException(nameof(notificationRepository));
            _logger = logger;
            _cache = cache;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Notification>>> GetNotifications()
        {
            if (_notificationRepository == null)
            {
                _logger.LogError("Notification repository is null");
                return StatusCode(500, "Internal Server Error");
            }

            try
            {
                var cacheKey = "notifications";
                if (_cache.TryGetValue(cacheKey, out IEnumerable<Notification> notifications))
                {
                    return Ok(notifications);
                }

                notifications = await _notificationRepository.GetNotificationsAsync();
                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromHours(1));

                _cache.Set(cacheKey, notifications, cacheEntryOptions);

                return Ok(notifications);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting notifications");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}