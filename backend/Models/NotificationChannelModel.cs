

```csharp
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class NotificationChannelModel
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 1)]
        public string Name { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 1)]
        public string Description { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 1)]
        public string Type { get; set; }

        [Required]
        [StringLength(1000, MinimumLength = 1)]
        public string Configuration { get; set; }

        [Required]
        public bool IsActive { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public DateTime UpdatedAt { get; set; }

        public NotificationChannelModel()
        {
            Id = Guid.NewGuid();
            CreatedAt = DateTime.Now;
            UpdatedAt = DateTime.Now;
        }
    }
}
```