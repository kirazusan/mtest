

```csharp
using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNamespace.Models;
using YourNamespace.Repositories.Interfaces;

namespace YourNamespace.Repositories
{
    public class MathOperatorRepository : IRepository<MathOperator>
    {
        private readonly YourDbContext _context;

        public MathOperatorRepository(YourDbContext context)
        {
            _context = context;
        }

        public async Task<MathOperator> UpdateMathOperator(string operatorValue)
        {
            if (string.IsNullOrEmpty(operatorValue))
            {
                throw new ArgumentException("operatorValue cannot be null or empty", nameof(operatorValue));
            }

            var mathOperator = await _context.MathOperators.FindAsync(operatorValue);
            if (mathOperator == null)
            {
                throw new InvalidOperationException($"MathOperator with operatorValue '{operatorValue}' not found");
            }

            mathOperator.OperatorValue = operatorValue;
            _context.Entry(mathOperator).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return mathOperator;
        }
    }
}
```