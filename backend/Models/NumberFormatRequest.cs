package Models;

using System.ComponentModel.DataAnnotations;

public class NumberFormatRequest {
    [Required]
    public double Value { get; set; }

    [Required]
    [RegularExpression(@"^[0-9.,]+$", ErrorMessage = "Invalid format string.")]
    public string Format { get; set; }

    public string FormatValue() {
        return Value.ToString(Format);
    }
}