

```csharp
using System;
using System.ComponentModel.DataAnnotations;

namespace backend.models
{
    /// <summary>
    /// Represents a permission request with Id, Name, and Description.
    /// </summary>
    public class PermissionRequest
    {
        /// <summary>
        /// Gets or sets the unique identifier for the permission request.
        /// </summary>
        [Required]
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the name of the permission request.
        /// </summary>
        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets the description of the permission request.
        /// </summary>
        [StringLength(200, MinimumLength = 3)]
        public string Description { get; set; }
    }
}
```