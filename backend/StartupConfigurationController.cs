

```csharp
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StartupConfigurationController : ControllerBase
    {
        private readonly StartupConfigurationDbContext _context;

        public StartupConfigurationController(StartupConfigurationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<JsonResult>> GetStartupConfiguration()
        {
            var startupConfiguration = await _context.StartupConfigurations
                .Include(sc => sc.PermissionRequests)
                .Include(sc => sc.NotificationChannelSettings)
                .FirstOrDefaultAsync();

            if (startupConfiguration == null)
            {
                return NotFound();
            }

            return new JsonResult(startupConfiguration);
        }
    }

    public class StartupConfiguration
    {
        [Key]
        public int Id { get; set; }
        public string ConfigurationData { get; set; }
        public ICollection<PermissionRequest> PermissionRequests { get; set; }
        public ICollection<NotificationChannelSetting> NotificationChannelSettings { get; set; }
    }

    public class PermissionRequest
    {
        [Key]
        public int Id { get; set; }
        public string RequestData { get; set; }
        public int StartupConfigurationId { get; set; }
        [ForeignKey("StartupConfigurationId")]
        public StartupConfiguration StartupConfiguration { get; set; }
    }

    public class NotificationChannelSetting
    {
        [Key]
        public int Id { get; set; }
        public string SettingData { get; set; }
        public int StartupConfigurationId { get; set; }
        [ForeignKey("StartupConfigurationId")]
        public StartupConfiguration StartupConfiguration { get; set; }
    }

    public class StartupConfigurationDbContext : DbContext
    {
        public DbSet<StartupConfiguration> StartupConfigurations { get; set; }
        public DbSet<PermissionRequest> PermissionRequests { get; set; }
        public DbSet<NotificationChannelSetting> NotificationChannelSettings { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=tcp:localhost,1433;Database=StartupConfigurationDb;User ID=sa;Password=P@ssw0rd;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<StartupConfiguration>()
                .HasMany(sc => sc.PermissionRequests)
                .WithOne(pr => pr.StartupConfiguration)
                .HasForeignKey(pr => pr.StartupConfigurationId);

            modelBuilder.Entity<StartupConfiguration>()
                .HasMany(sc => sc.NotificationChannelSettings)
                .WithOne(ncs => ncs.StartupConfiguration)
                .HasForeignKey(ncs => ncs.StartupConfigurationId);
        }
    }
}
```