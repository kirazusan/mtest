

using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Interfaces;
using Microsoft.Extensions.Logging;

namespace backend.Repositories
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly DbContext _dbContext;
        private readonly ILogger _logger;

        public NotificationRepository(DbContext dbContext, ILogger<NotificationRepository> logger)
        {
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            _logger = logger;
        }

        public IEnumerable<Notification> GetAllNotifications()
        {
            try
            {
                return _dbContext.Notifications.ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting all notifications");
                throw;
            }
        }

        public Notification GetNotificationById(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentException("Invalid notification id", nameof(id));
            }

            try
            {
                return _dbContext.Notifications.Find(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting notification by id");
                throw;
            }
        }

        public void AddNotification(Notification notification)
        {
            if (notification == null)
            {
                throw new ArgumentNullException(nameof(notification));
            }

            try
            {
                _dbContext.Notifications.Add(notification);
                _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding notification");
                throw;
            }
        }

        public void UpdateNotification(Notification notification)
        {
            if (notification == null)
            {
                throw new ArgumentNullException(nameof(notification));
            }

            try
            {
                _dbContext.Notifications.Update(notification);
                _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating notification");
                throw;
            }
        }

        public void DeleteNotification(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentException("Invalid notification id", nameof(id));
            }

            try
            {
                var notification = _dbContext.Notifications.Find(id);
                if (notification != null)
                {
                    _dbContext.Notifications.Remove(notification);
                    _dbContext.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting notification");
                throw;
            }
        }
    }
}