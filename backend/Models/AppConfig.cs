using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class AppConfig
    {
        [Required]
        public string AppName { get; set; }

        [Required]
        [Url]
        public string ApiBaseUrl { get; set; }

        [Range(1, 100)]
        public int MaxUsers { get; set; }

        [Required]
        [RegularExpression("^(Development|Staging|Production)$")]
        public string Environment { get; set; }

        [Required]
        public string AppVersion { get; set; }

        [Required]
        public bool EnableFeatureX { get; set; }

        [EmailAddress]
        [Required]
        public string SupportEmail { get; set; }
    }
}