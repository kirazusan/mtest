using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<CalculationHistory> CalculationHistories { get; set; }
    }

    public class CalculationHistory
    {
        public int Id { get; set; }
        public string Calculation { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}

using Microsoft.Extensions.DependencyInjection;

public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer("YourConnectionStringHere"));
    }
}