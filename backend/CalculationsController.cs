

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CalculationsController : ControllerBase
    {
        private readonly CalculationsContext _context;

        public CalculationsController(CalculationsContext context)
        {
            _context = context;
        }

        // GET: api/Calculations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Calculations>>> GetCalculationsList()
        {
            return await _context.Calculations.ToListAsync();
        }

        // GET: api/Calculations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Calculations>> GetCalculationsById(int id)
        {
            var calculations = await _context.Calculations.FindAsync(id);

            if (calculations == null)
            {
                return NotFound();
            }

            return calculations;
        }

        // PUT: api/Calculations/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCalculations(int id, Calculations calculations)
        {
            if (id != calculations.Id)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Entry(calculations).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CalculationsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Calculations
        [HttpPost]
        public async Task<ActionResult<Calculations>> CreateCalculations(Calculations calculations)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Calculations.Add(calculations);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCalculationsById", new { id = calculations.Id }, calculations);
        }

        // DELETE: api/Calculations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Calculations>> DeleteCalculations(int id)
        {
            var calculations = await _context.Calculations.FindAsync(id);
            if (calculations == null)
            {
                return NotFound();
            }

            _context.Calculations.Remove(calculations);
            await _context.SaveChangesAsync();

            return calculations;
        }

        private bool CalculationsExists(int id)
        {
            return _context.Calculations.Any(e => e.Id == id);
        }
    }

    public class Calculations
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }
    }

    public class CalculationsContext : DbContext
    {
        public DbSet<Calculations> Calculations { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=tcp:localhost,1433;Database=CalculationsDB;User ID=sa;Password=P@ssw0rd;");
        }
    }
}
```