

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using System;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CreateNotificationChannelController : ControllerBase
    {
        private readonly ILogger<CreateNotificationChannelController> _logger;
        private readonly INotificationChannelService _notificationChannelService;
        private readonly IConfiguration _configuration;

        public CreateNotificationChannelController(ILogger<CreateNotificationChannelController> logger, INotificationChannelService notificationChannelService, IConfiguration configuration)
        {
            _logger = logger;
            _notificationChannelService = notificationChannelService;
            _configuration = configuration;
        }

        public class CreateNotificationChannelRequest
        {
            [Required]
            public string ChannelName { get; set; }
            [Required]
            public string ChannelType { get; set; }
            [Required]
            public string ChannelUrl { get; set; }
        }

        [HttpPost]
        public async Task<IActionResult> CreateNotificationChannel(CreateNotificationChannelRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var notificationChannel = await _notificationChannelService.CreateNotificationChannel(request.ChannelName, request.ChannelType, request.ChannelUrl);
                return Ok(notificationChannel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while creating a notification channel");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while creating a notification channel");
            }
        }
    }

    public interface INotificationChannelService
    {
        Task<NotificationChannel> CreateNotificationChannel(string channelName, string channelType, string channelUrl);
    }

    public class NotificationChannelService : INotificationChannelService
    {
        private readonly NotificationDbContext _dbContext;
        private readonly IConfiguration _configuration;

        public NotificationChannelService(NotificationDbContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }

        public async Task<NotificationChannel> CreateNotificationChannel(string channelName, string channelType, string channelUrl)
        {
            var notificationChannel = new NotificationChannel
            {
                ChannelName = channelName,
                ChannelType = channelType,
                ChannelUrl = channelUrl
            };

            _dbContext.NotificationChannels.Add(notificationChannel);
            await _dbContext.SaveChangesAsync();

            return notificationChannel;
        }
    }

    public class NotificationChannel
    {
        public int Id { get; set; }
        public string ChannelName { get; set; }
        public string ChannelType { get; set; }
        public string ChannelUrl { get; set; }
    }

    public class NotificationDbContext : DbContext
    {
        public DbSet<NotificationChannel> NotificationChannels { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_configuration.GetConnectionString("NotificationDB"));
        }
    }
}