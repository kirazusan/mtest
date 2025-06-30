

```csharp
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class ApplicationState
    {
        [Key]
        public int Id { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "StateValue must be a non-negative integer")]
        public int StateValue { get; set; }

        public int Timestamp { get; set; }
    }

    public class ApplicationContext : DbContext
    {
        public DbSet<ApplicationState> ApplicationStates { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=tcp:localhost,1433;Database=ApplicationStateDB;User ID=sa;Password=Password123;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ApplicationState>().ToTable("AppState");
        }
    }
}
```