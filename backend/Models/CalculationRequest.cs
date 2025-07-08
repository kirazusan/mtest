using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class CalculationRequest
    {
        [Required]
        [Range(double.MinValue, double.MaxValue)]
        public double Number1 { get; set; }

        [Required]
        [Range(double.MinValue, double.MaxValue)]
        public double Number2 { get; set; }

        [Required]
        [StringLength(50)]
        public string Operation { get; set; }

        public double? DoubleValue { get; set; }

        [StringLength(20)]
        public string DecimalFormat { get; set; }
    }
}