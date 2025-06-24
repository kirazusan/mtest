

```csharp
using System.ComponentModel.DataAnnotations;

namespace Database
{
    public class CalculatorState
    {
        [Key]
        public int Id { get; set; }
        public string ResultText { get; set; }
        public string PendingOperation { get; set; }
    }
}
```