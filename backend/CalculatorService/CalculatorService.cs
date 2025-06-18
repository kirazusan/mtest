

```csharp
using System;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using System.Data.SqlClient;

namespace backend.CalculatorService
{
    public class CalculatorService
    {
        private readonly ILogger<CalculatorService> _logger;
        private readonly CalculatorContext _calculatorContext;
        public decimal FirstNumber { get; set; }
        public decimal SecondNumber { get; set; }
        public int CurrentState { get; set; }
        public int DecimalFormat { get; set; }
        public string CurrentEntry { get; set; }
        public decimal ResultText { get; set; }

        public CalculatorService(ILogger<CalculatorService> logger, CalculatorContext calculatorContext)
        {
            _logger = logger;
            _calculatorContext = calculatorContext;
            ResetCalculatorState();
        }

        public void ResetCalculatorState()
        {
            try
            {
                FirstNumber = 0;
                SecondNumber = 0;
                CurrentState = 0;
                DecimalFormat = 0;
                CurrentEntry = "";
                ResultText = 0;

                var calculatorState = _calculatorContext.CalculatorStates.FirstOrDefault();
                if (calculatorState != null)
                {
                    calculatorState.FirstNumber = FirstNumber;
                    calculatorState.SecondNumber = SecondNumber;
                    calculatorState.CurrentState = CurrentState;
                    calculatorState.DecimalFormat = DecimalFormat;
                    calculatorState.CurrentEntry = CurrentEntry;
                    calculatorState.ResultText = ResultText;
                    _calculatorContext.SaveChanges();
                }
                else
                {
                    calculatorState = new CalculatorState
                    {
                        FirstNumber = FirstNumber,
                        SecondNumber = SecondNumber,
                        CurrentState = CurrentState,
                        DecimalFormat = DecimalFormat,
                        CurrentEntry = CurrentEntry,
                        ResultText = ResultText
                    };
                    _calculatorContext.CalculatorStates.Add(calculatorState);
                    _calculatorContext.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error resetting calculator state");
                throw;
            }
        }
    }

    public class CalculatorContext : DbContext
    {
        public DbSet<CalculatorState> CalculatorStates { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=(localdb)\\mssqllocaldb;Initial Catalog=CalculatorDB;Integrated Security=True");
        }
    }

    public class CalculatorState
    {
        public int Id { get; set; }
        public decimal FirstNumber { get; set; }
        public decimal SecondNumber { get; set; }
        public int CurrentState { get; set; }
        public int DecimalFormat { get; set; }
        public string CurrentEntry { get; set; }
        public decimal ResultText { get; set; }
    }
}
```