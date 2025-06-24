

```csharp
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class CalculationState
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [Range(0, int.MaxValue)]
        public int FirstNumber { get; set; }
        [Required]
        [Range(0, int.MaxValue)]
        public int SecondNumber { get; set; }
        [Required]
        [Range(0, int.MaxValue)]
        public int CurrentState { get; set; }
        [Required]
        [RegularExpression(@"^\d+(\.\d+)?$")]
        public string DecimalFormat { get; set; }
    }
}
```