

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class CalculatorState
    {
        [Key]
        public int Id { get; set; }
        public double FirstNumber { get; set; }
        public double SecondNumber { get; set; }
        public string MathematicalOperator { get; set; }
        public string CurrentCalculation { get; set; }
    }

    public class CalculatorStateContext : DbContext
    {
        public CalculatorStateContext(DbContextOptions<CalculatorStateContext> options) : base(options)
        {
        }

        public DbSet<CalculatorState> CalculatorStates { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CalculatorState>().ToTable("CalculatorStates");
        }
    }
}