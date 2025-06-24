

using System.ComponentModel.DataAnnotations;

namespace Models
{
    [Table("CalculatorStates")]
    public class CalculatorStates
    {
        public string CurrentState { get; set; }
    }
}