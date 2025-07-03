using System;

namespace Calculator.Models
{
    public class CalculationHistory
    {
        public double Number1 { get; set; }
        public double Number2 { get; set; }
        public string Operator { get; set; }
        public double Result { get; set; }
        public DateTime Timestamp { get; set; }
    }
}