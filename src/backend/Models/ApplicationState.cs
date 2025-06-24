

```csharp
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace src.backend.Models
{
    [Table("ApplicationState")]
    public class ApplicationState
    {
        [Key]
        public bool IsStarted { get; set; }
    }
}
```